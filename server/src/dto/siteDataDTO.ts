// what the client actually gets sent about the things their site collected
import type { Types } from 'mongoose';
import type { AssessmentJSON, SubscriberJSON } from '../../../shared/portal.js';
import type { AssessmentResultFields } from '../models/AssessmentResult.js';
import type { SubscriberFields } from '../models/Subscriber.js';

type AssessmentLike = Pick<AssessmentResultFields, 'assessmentType' | 'score' | 'riskLevel' | 'createdAt'> & { _id: Types.ObjectId };
type SubscriberLike = Pick<SubscriberFields, 'email' | 'sourcePage' | 'createdAt'> & { _id: Types.ObjectId };

/** one finished assessment. there is nothing on it about who took it, here or in the database */
export function toAssessmentJSON(result: AssessmentLike): AssessmentJSON {
    return {
        id: String(result._id),
        type: result.assessmentType,
        score: result.score,
        riskLevel: result.riskLevel,
        createdAt: result.createdAt.toISOString()
    };
}

/** one newsletter signup */
export function toSubscriberJSON(subscriber: SubscriberLike): SubscriberJSON {
    return {
        id: String(subscriber._id),
        email: subscriber.email,
        sourcePage: subscriber.sourcePage,
        createdAt: subscriber.createdAt.toISOString()
    };
}
