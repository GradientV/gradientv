// the people, in the order they show on the Team page.
// names, photos and links are the same in every language, so they live here.
// each person's role and bio are words, so those live in src/content under team.members[id]
//
// size decides the layout:
//   'feature' = big photo beside the bio (the founder)
//   'card'    = photo card
//   'small'   = one slim row with initials, for someone without a photo yet.
//               to upgrade a person: drop a photo in public/images/team, set photo, change size to 'card'
import type { Content } from '../content/index';

/** a person's id. their role and bio sit under the same id in src/content: t.team.members[id] */
export type MemberId = keyof Content['team']['members'];

type Photo = { src: string; width: number; height: number };

/** the big feature and the card both show a photo. a small row is for someone who doesn't have one yet */
export type Person = {
    id: MemberId;
    name: string;
    initials: string;
    links: Array<{ kind: 'website' | 'linkedin' | 'github'; href: string }>;
} & (
    | { size: 'feature'; photo: Photo }
    | { size: 'card'; photo: Photo }
    | { size: 'small'; photo: null }
);

/** someone with a photo: the feature and card layouts */
export type PersonWithPhoto = Extract<Person, { photo: Photo }>;

export const TEAM: Person[] = [
    {
        id: 'ashton',
        name: 'Ashton Reyes',
        initials: 'AR',
        size: 'feature',
        photo: { src: '/images/team/founder-2026-11.jpg', width: 937, height: 1186 },
        links: [
            { kind: 'website', href: 'https://ashtonreyes.com/' },
            { kind: 'linkedin', href: 'https://www.linkedin.com/in/ashton-reyes/' },
            { kind: 'github', href: 'https://github.com/ashton-reyes' }
        ]
    },
    {
        id: 'jorel',
        name: 'Jorel Chan',
        initials: 'JC',
        size: 'card',
        photo: { src: '/images/team/jorel-chan.jpg', width: 400, height: 400 },
        links: [
            { kind: 'linkedin', href: 'https://www.linkedin.com/in/jorel-chan-755ba4350/' }
        ]
    },
    {
        id: 'bryce',
        name: 'Bryce Whiteside',
        initials: 'BW',
        size: 'card',
        photo: { src: '/images/team/bryce-whiteside.jpg', width: 400, height: 400 },
        links: [
            { kind: 'linkedin', href: 'https://www.linkedin.com/in/brycewhiteside/' },
            { kind: 'github', href: 'https://github.com/Brycewhi' }
        ]
    },
    {
        id: 'emily',
        name: 'Emily Fisherman',
        initials: 'EF',
        size: 'small',
        photo: null,
        links: [
            { kind: 'linkedin', href: 'https://www.linkedin.com/in/emilyfisherman/' }
        ]
    },
    {
        id: 'brian',
        name: 'Brian Huang',
        initials: 'BH',
        size: 'card',
        photo: { src: '/images/team/brian-huang.jpg', width: 400, height: 400 },
        links: [
            { kind: 'linkedin', href: 'https://www.linkedin.com/in/bbrihuang/' }
        ]
    },
    {
        id: 'katie',
        name: 'Katie Jun',
        initials: 'KJ',
        size: 'small',
        photo: null,
        links: [
            { kind: 'linkedin', href: 'https://www.linkedin.com/in/katie-jun/' }
        ]
    }
];

const founder = TEAM.find((person) => person.id === 'ashton');
if (!founder?.photo) throw new Error('team.ts: the founder needs a photo, for the Story page');

/** the founder, for the Story page */
export const FOUNDER: PersonWithPhoto = founder;
