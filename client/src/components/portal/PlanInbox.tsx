// what the admin login sees above the client requests: everything that came in
// through Build your plan on the public site, newest first. each one has who sent it,
// how to reach them, what they picked, and a menu to move it along.
// a client's browser can't use any of this even if it tried, the server checks the role (requireAdmin)
import { useEffect, useState } from 'react';
import type { PlanJSON, RequestStatus } from '../../../../shared/portal';
import { useLocale } from '../../context/LocaleContext';
import * as api from '../../api/api';
import { PackageIcon } from '../ui/Icons';
import { shortDate } from './StatusBadge';

export default function PlanInbox() {
    const { t } = useLocale();
    const words = t.portal.plans;

    const [plans, setPlans] = useState<PlanJSON[] | null>(null); // null until the list arrives
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;
        api.listPlans()
            .then((list) => {
                if (!ignore) setPlans(list);
            })
            .catch((problem: unknown) => {
                if (ignore) return;
                setPlans([]);
                setError(api.messageOf(problem));
            });
        return () => { ignore = true; };
    }, []);

    async function handleStatus(id: string, status: RequestStatus) {
        setError('');
        try {
            const updated = await api.setPlanStatus(id, status);
            setPlans((list) => (list ?? []).map((plan) => (plan.id === id ? updated : plan)));
        } catch (problem) {
            // nothing changed in the list, so the menu snaps back to what the server still has
            setError(api.messageOf(problem));
        }
    }

    return (
        <section className="border border-line bg-paper-bright p-6 sm:p-8">
            <h2 className="display-md">{words.heading}</h2>
            <p className="mt-2 text-ink-soft">{words.intro}</p>

            {error && <p role="alert" className="mt-4 border border-line bg-paper px-4 py-3 text-sm">{error}</p>}
            {plans === null && <p role="status" className="mt-4 text-ink-soft">{words.loading}</p>}
            {plans?.length === 0 && !error && <p className="mt-4 text-ink-soft">{words.empty}</p>}

            {plans && plans.length > 0 && (
                <ul className="mt-4 divide-y divide-line">
                    {plans.map((plan) => (
                        // a finished one fades back so the open ones stand out
                        <li key={plan.id} className={`py-5 ${plan.status === 'done' ? 'opacity-60' : ''}`}>
                            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                                <div className="min-w-0">
                                    <p>
                                        <span className="font-medium">{plan.name}</span>
                                        <span className="ml-2 text-sm text-ink-soft">{shortDate(plan.createdAt)}</span>
                                    </p>
                                    <p className="text-sm text-ink-soft">
                                        {plan.businessName ?? words.noBusiness}
                                        {plan.businessType && `, ${plan.businessType}`}
                                        {plan.locale !== 'en' && ` · ${words.languages[plan.locale] ?? plan.locale}`}
                                    </p>
                                </div>
                                <select
                                    aria-label={`${words.statusLabel}: ${plan.name}, ${shortDate(plan.createdAt)}`}
                                    value={plan.status}
                                    // the options are the three statuses, so whatever gets picked is one of them
                                    onChange={(event) => handleStatus(plan.id, event.target.value as RequestStatus)}
                                    className="cursor-pointer border border-line bg-paper px-3 py-1.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25"
                                >
                                    {Object.entries(t.portal.requests.status).map(([status, label]) => (
                                        <option key={status} value={status}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <ul className="mt-3 flex flex-wrap gap-2">
                                {plan.packages.map((id) => (
                                    <li key={id} className="flex items-center gap-1.5 border border-line bg-paper px-2.5 py-1 text-sm">
                                        <PackageIcon id={id} className="h-4 w-4 text-accent" />
                                        {t.packages.items[id].name}
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                                <a href={`mailto:${plan.email}`} className="break-all underline decoration-ink/30 underline-offset-4 hover:decoration-ink">{plan.email}</a>
                                {plan.phone && (
                                    <a href={`tel:${plan.phone.replace(/[^\d+]/g, '')}`} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">{plan.phone}</a>
                                )}
                            </p>
                            {plan.message && <p className="mt-3 max-w-[75ch] break-words whitespace-pre-line">{plan.message}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
