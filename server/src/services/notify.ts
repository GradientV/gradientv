// telling me someone asked for something, with a message in Slack: a client's change
// request, or a new "Build your plan" from the public site.
// it only does anything when SLACK_WEBHOOK_URL is set (api.slack.com/apps > Incoming Webhooks).
// without it everything works the same, i just have to look at the portal myself
import type { PackageId } from '../../../shared/portal.js';
import { messageOf } from '../middleware/errorHandlers.js';
import { PACKAGE_NAMES } from '../models/PlanRequest.js';

// Slack reads < > & as the start of links and @mentions. what people type is only ever words,
// so these three get swapped for their harmless versions before going in the message
function plain(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** never throws. a Slack hiccup must not turn into "your request failed" for whoever sent it */
async function postToSlack(text: string, what: string): Promise<void> {
    const url = process.env.SLACK_WEBHOOK_URL;
    if (!url) return;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
            // don't keep them waiting on Slack
            signal: AbortSignal.timeout(3000)
        });
        if (!response.ok) console.error(`Slack answered ${response.status} to the ${what} message.`);
    } catch (error) {
        console.error(`Could not reach Slack: ${messageOf(error)}`);
    }
}

export async function notifyNewRequest(account: { businessName: string }, request: { message: string }): Promise<void> {
    await postToSlack(`New request from *${plain(account.businessName)}*:\n${plain(request.message)}`, 'new-request');
}

type PlanNotice = {
    packages: PackageId[];
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    businessType?: string;
    message?: string;
};

export async function notifyNewPlan(plan: PlanNotice): Promise<void> {
    const who = plan.businessName ? `${plan.name} (${plan.businessName})` : plan.name;
    const lines = [
        `New plan request from *${plain(who)}*`,
        // the package names are mine, but "Website & Brand" still needs its & made harmless
        `Packages: ${plain(plan.packages.map((id) => PACKAGE_NAMES[id]).join(', '))}`,
        `Email: ${plain(plan.email)}${plan.phone ? `, phone: ${plain(plan.phone)}` : ''}`,
        ...(plan.businessType ? [`Business: ${plain(plan.businessType)}`] : []),
        ...(plan.message ? [plain(plan.message)] : [])
    ];
    await postToSlack(lines.join('\n'), 'new-plan');
}
