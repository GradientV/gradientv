// the Team page. the people and their order come from src/data/team.ts,
// and each person's `size` there decides which of the three layouts they get
import { Link } from 'react-router';
import PageHero from '../components/PageHero';
import { PersonCard, PersonFeature, PersonRow } from '../components/Person';
import Seo from '../components/Seo';
import UnderBand from '../components/UnderBand';
import { ArrowRightIcon } from '../components/ui/Icons';
import { useLocale } from '../context/LocaleContext';
import { pageUrl } from '../data/pages';
import { teamSchema } from '../data/schema';
import { TEAM } from '../data/team';

export default function TeamView() {
    const { locale, t, to } = useLocale();

    const featured = TEAM.filter((person) => person.size === 'feature');
    const cards = TEAM.filter((person) => person.size === 'card');
    const rows = TEAM.filter((person) => person.size === 'small');

    return (
        <>
            <Seo
                pageId="team"
                title={t.team.seo.title}
                description={t.team.seo.description}
                schema={teamSchema(t, pageUrl('team', locale))}
            />

            <PageHero label={t.team.label} title={t.team.heading} />

            <UnderBand className="pb-24 md:pb-32">
                {featured.map((person) => (
                    <PersonFeature key={person.id} person={person}>
                        <Link
                            to={`${to('story')}#founder`}
                            className="group mt-7 inline-flex items-center gap-2 font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                        >
                            {t.team.storyLink}
                            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </PersonFeature>
                ))}

                <ul className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-2">
                    {cards.map((person) => <PersonCard key={person.id} person={person} />)}
                </ul>

                <ul className="mt-4 grid gap-4">
                    {rows.map((person) => <PersonRow key={person.id} person={person} />)}
                </ul>
            </UnderBand>
        </>
    );
}
