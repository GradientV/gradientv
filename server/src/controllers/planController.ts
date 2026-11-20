// the controllers for "Build your plan"
// createPlan is the one door on the API that's open to anyone, signed in or not:
// it's the form on the public site. the other two run behind requireAuth and
// requireAdmin (adminRoutes.ts), so only i can read or move what came in
import type { Request, Response } from 'express';
import type { PlanJSON } from '../../../shared/portal.js';
import { toPlanJSON } from '../dto/planDTO.js';
import { HttpError } from '../middleware/errorHandlers.js';
import { isStatus, STATUSES } from '../models/ChangeRequest.js';
import { PlanRequest } from '../models/PlanRequest.js';
import { notifyNewPlan } from '../services/notify.js';
import { cleanPlan } from '../services/plans.js';

const DAY = 24 * 60 * 60 * 1000;
// far more than a real day brings. a bot that finds the form can fill neither the
// database (the free one holds 512 MB, shared by every client) nor my Slack
export const PLANS_PER_DAY = 40;
// a person who presses send twice is fine. the same address ten times is not
export const PLANS_PER_EMAIL_PER_DAY = 3;

/** POST /api/plan { packages, name, email, phone?, businessName?, businessType?, message?, locale? } */
export async function createPlan(req: Request, res: Response<{ ok: true }>): Promise<void> {
    const body = (req.body ?? {}) as Record<string, unknown>;

    // the hidden field. a person never sees it, so anything in it came from a bot.
    // the bot gets the same answer a person would, so it can't tell, and nothing is saved
    if (typeof body.homepage === 'string' && body.homepage.trim() !== '') {
        res.status(201).json({ ok: true });
        return;
    }

    const plan = cleanPlan(body);
    const since = new Date(Date.now() - DAY);
    if (await PlanRequest.countDocuments({ createdAt: { $gt: since } }) >= PLANS_PER_DAY) {
        throw new HttpError(429, 'We have had a lot of requests today. Call or email us and we will get right back to you.');
    }
    if (await PlanRequest.countDocuments({ email: plan.email, createdAt: { $gt: since } }) >= PLANS_PER_EMAIL_PER_DAY) {
        throw new HttpError(429, 'We already have your plan. We will be in touch within one business day.');
    }

    await PlanRequest.create(plan);
    await notifyNewPlan(plan);
    res.status(201).json({ ok: true });
}

/** GET /api/admin/plans -> every plan request, newest first */
export async function listPlans(_req: Request, res: Response<PlanJSON[]>): Promise<void> {
    const plans = await PlanRequest.find().sort('-createdAt').lean();
    res.json(plans.map(toPlanJSON));
}

/** PATCH /api/admin/plans/:id { status } -> the updated plan request */
export async function setPlanStatus(req: Request<{ id: string }>, res: Response<PlanJSON>): Promise<void> {
    const { status } = (req.body ?? {}) as { status?: unknown };
    if (!isStatus(status)) {
        throw new HttpError(400, `The status has to be one of: ${STATUSES.join(', ')}.`);
    }

    const plan = await PlanRequest.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' }).lean();
    if (plan === null) throw new HttpError(404, 'There is no plan request with that id.');
    res.json(toPlanJSON(plan));
}
