// the things a client's own website sends to the portal (finished assessments,
// newsletter signups): checking them, saving them, and reading them back for the client.
// the controllers use this, and so does scripts/import-site-data.ts, so a row
// brought over from an old database goes through the same checks as a new one
import type { Types } from 'mongoose';
import type { AssessmentSummaryJSON, RiskLevel } from '../../../shared/portal.js';
import { AssessmentResult, isRiskLevel, LABEL_MAX, RISK_LEVELS, TYPE_PATTERN, type AssessmentResultFields } from '../models/AssessmentResult.js';
import { EMAIL_MAX, SOURCE_PATTERN, Subscriber, type SubscriberFields } from '../models/Subscriber.js';
import { HttpError } from '../middleware/errorHandlers.js';

const DAY = 24 * 60 * 60 * 1000;
// "something @ something . something", no spaces. the real test of an address is whether mail arrives
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECENT_RESULTS = 50;
const NEWEST_SUBSCRIBERS = 1000;
const DUPLICATE_KEY = 11000;

/** an account is all these functions need to know about whose data it is */
export type Owner = { _id: Types.ObjectId };
/** a row as .lean() hands it back: the plain fields and its id */
type Lean<Fields> = Fields & { _id: Types.ObjectId };

// -------------------- checking --------------------

/** what a site sends for one assessment. anything could arrive, so nothing is trusted yet */
export type AssessmentInput = { type?: unknown; label?: unknown; score?: unknown; riskLevel?: unknown };
/** one assessment after the checks, with the fields named the way the model names them */
export type CleanAssessment = { assessmentType: string; label: string | null; score: number; riskLevel: RiskLevel };

/** Checks one assessment result. Throws a 400 that says what is wrong with it. */
export function cleanAssessment({ type, label, score, riskLevel }: AssessmentInput = {}): CleanAssessment {
    if (typeof type !== 'string' || !TYPE_PATTERN.test(type)) {
        throw new HttpError(400, 'type has to be a short name like quick-check.');
    }
    if (typeof score !== 'number' || !Number.isInteger(score) || score < 0 || score > 100) {
        throw new HttpError(400, 'score has to be a whole number from 0 to 100.');
    }
    if (!isRiskLevel(riskLevel)) {
        throw new HttpError(400, `riskLevel has to be one of: ${RISK_LEVELS.join(', ')}.`);
    }
    if (label != null && (typeof label !== 'string' || label.trim().length > LABEL_MAX)) {
        throw new HttpError(400, `label has to be text, ${LABEL_MAX} characters at most.`);
    }
    return { assessmentType: type, label: typeof label === 'string' ? label.trim() || null : null, score, riskLevel };
}

/** one newsletter signup after the checks */
export type CleanSubscriber = { email: string; sourcePage: string | null };

/** Checks one newsletter signup. Throws a 400 when the email isn't one. */
export function cleanSubscriber({ email, sourcePage }: { email?: unknown; sourcePage?: unknown } = {}): CleanSubscriber {
    // lowercase first, so ' Colin@Example.COM ' and 'colin@example.com' can't become two rows
    const address = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (address.length > EMAIL_MAX || !EMAIL_PATTERN.test(address)) {
        throw new HttpError(400, 'email has to be an email address.');
    }
    // the page is nice to have. one that looks wrong gets dropped and the signup still counts
    const page = typeof sourcePage === 'string' && SOURCE_PATTERN.test(sourcePage) ? sourcePage : null;
    return { email: address, sourcePage: page };
}

// -------------------- saving --------------------

/**
 * Puts an address on a client's list. Returns false when the address was already on it.
 * @param when only the import passes this, to keep the day they really signed up
 */
export async function addSubscriber(account: Owner, { email, sourcePage }: CleanSubscriber, when: Date = new Date()): Promise<boolean> {
    try {
        // upsert: make the row only if there isn't one. $setOnInsert is skipped when there is,
        // so signing up again doesn't change the date or the page of the first time
        const result = await Subscriber.updateOne(
            { account: account._id, email },
            { $setOnInsert: { sourcePage, createdAt: when, updatedAt: when } },
            { upsert: true, timestamps: false }
        );
        return result.upsertedCount === 1;
    } catch (error) {
        // two signups for the same address at the same instant: one wins, the other lands here
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === DUPLICATE_KEY) return false;
        throw error;
    }
}

/** anything that can count rows by account and date: the AssessmentResult and Subscriber models */
export type Countable = { countDocuments(filter: { account: Types.ObjectId; createdAt: { $gt: Date } }): PromiseLike<number> };

/** how many of these the account got in the last 24 hours */
export function countToday(Model: Countable, account: Owner): PromiseLike<number> {
    return Model.countDocuments({ account: account._id, createdAt: { $gt: new Date(Date.now() - DAY) } });
}

// -------------------- reading --------------------

/** one row per assessment type, as the first aggregate below groups them */
type TypeGroup = { _id: string; count: number; averageScore: number; low: number; medium: number; high: number };

/** Everything the assessments card shows for one client. recent still needs its DTO */
export async function summarizeAssessments(account: Owner): Promise<Omit<AssessmentSummaryJSON, 'recent'> & { recent: Lean<AssessmentResultFields>[] }> {
    const mine = { account: account._id };
    const oneIfRisk = (level: RiskLevel) => ({ $sum: { $cond: [{ $eq: ['$riskLevel', level] }, 1, 0] } });

    const [groups, labels, recent, last30] = await Promise.all([
        // one row per assessment: how many, the average score, and how the risk levels split
        AssessmentResult.aggregate<TypeGroup>([
            { $match: mine },
            { $group: {
                _id: '$assessmentType',
                count: { $sum: 1 },
                averageScore: { $avg: '$score' },
                low: oneIfRisk('low'),
                medium: oneIfRisk('medium'),
                high: oneIfRisk('high')
            } },
            { $sort: { count: -1, _id: 1 } }
        ]),
        // the name each assessment was last sent with. rows from before names existed
        // don't have one, so this looks for the newest row that does
        AssessmentResult.aggregate<{ _id: string; label: string }>([
            { $match: { ...mine, label: { $type: 'string' } } },
            { $sort: { createdAt: -1 } },
            { $group: { _id: '$assessmentType', label: { $first: '$label' } } }
        ]),
        AssessmentResult.find(mine).sort('-createdAt').limit(RECENT_RESULTS).lean<Lean<AssessmentResultFields>[]>(),
        AssessmentResult.countDocuments({ ...mine, createdAt: { $gt: new Date(Date.now() - 30 * DAY) } })
    ]);

    const labelFor = new Map(labels.map((row) => [row._id, row.label]));
    return {
        total: groups.reduce((sum, group) => sum + group.count, 0),
        last30,
        byType: groups.map((group) => ({
            type: group._id,
            label: labelFor.get(group._id) ?? null,
            count: group.count,
            averageScore: Math.round(group.averageScore),
            low: group.low,
            medium: group.medium,
            high: group.high
        })),
        recent
    };
}

/** { total, subscribers } newest first. subscribers stops at 1,000 */
export async function listSubscribers(account: Owner): Promise<{ total: number; subscribers: Lean<SubscriberFields>[] }> {
    const mine = { account: account._id };
    const [total, subscribers] = await Promise.all([
        Subscriber.countDocuments(mine),
        Subscriber.find(mine).sort('-createdAt').limit(NEWEST_SUBSCRIBERS).lean<Lean<SubscriberFields>[]>()
    ]);
    return { total, subscribers };
}
