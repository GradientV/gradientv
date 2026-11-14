// the controllers for the two cards that show a client what their own site collected
// both run behind requireAuth, so they answer for the signed-in account and nobody else
import type { Request, Response } from 'express';
import type { AssessmentSummaryJSON, SubscriberListJSON } from '../../../shared/portal.js';
import { toAssessmentJSON, toSubscriberJSON } from '../dto/siteDataDTO.js';
import { accountOf } from '../middleware/requireAuth.js';
import { listSubscribers, summarizeAssessments } from '../services/siteData.js';

/** GET /api/site-data/assessments -> { total, last30, byType, recent } */
export async function getAssessments(req: Request, res: Response<AssessmentSummaryJSON>): Promise<void> {
    const summary = await summarizeAssessments(accountOf(req));
    res.json({ ...summary, recent: summary.recent.map(toAssessmentJSON) });
}

/** GET /api/site-data/subscribers -> { total, subscribers } newest first */
export async function getSubscribers(req: Request, res: Response<SubscriberListJSON>): Promise<void> {
    const { total, subscribers } = await listSubscribers(accountOf(req));
    res.json({ total, subscribers: subscribers.map(toSubscriberJSON) });
}
