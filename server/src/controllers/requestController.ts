// the controllers for the request box
// every one of these runs behind requireAuth, so the account is whoever is signed in.
// that's the only place "which client is this" ever comes from
import type { Request, Response } from 'express';
import type { InboxJSON, RequestJSON } from '../../../shared/portal.js';
import { ChangeRequest, isStatus, MESSAGE_MAX, STATUSES } from '../models/ChangeRequest.js';
import { toInboxJSON, toRequestJSON } from '../dto/requestDTO.js';
import { HttpError } from '../middleware/errorHandlers.js';
import { accountOf } from '../middleware/requireAuth.js';
import { notifyNewRequest } from '../services/notify.js';

const DAY = 24 * 60 * 60 * 1000;
// plenty for a real client, and it keeps a stuck key or a script from flooding the list (and my Slack)
const MAX_PER_DAY = 20;

/** the two fields of the account that the inbox fills in (populate). null when that login was deleted */
type Owner = { businessName: string; email: string } | null;

/**
 * GET /api/requests -> newest first
 * a client gets their own. i get everyone's, with the business name on each
 */
export async function listRequests(req: Request, res: Response<RequestJSON[] | InboxJSON[]>): Promise<void> {
    const account = accountOf(req);
    if (account.role === 'admin') {
        const everything = await ChangeRequest.find().sort('-createdAt').populate<{ account: Owner }>('account', 'businessName email').lean();
        res.json(everything.map(toInboxJSON));
        return;
    }
    const mine = await ChangeRequest.find({ account: account._id }).sort('-createdAt').lean();
    res.json(mine.map(toRequestJSON));
}

/** POST /api/requests { message } -> the new request */
export async function createRequest(req: Request, res: Response<RequestJSON>): Promise<void> {
    const account = accountOf(req);
    const { message } = (req.body ?? {}) as { message?: unknown };
    if (typeof message !== 'string' || message.trim() === '') {
        throw new HttpError(400, 'Write what you would like changed first.');
    }
    if (message.trim().length > MESSAGE_MAX) {
        throw new HttpError(400, `That is a bit long. Keep it under ${MESSAGE_MAX} characters, or send it in two parts.`);
    }

    const today = await ChangeRequest.countDocuments({ account: account._id, createdAt: { $gt: new Date(Date.now() - DAY) } });
    if (today >= MAX_PER_DAY) {
        throw new HttpError(429, 'That is a lot of requests for one day. Reach us directly for anything urgent.');
    }

    const request = await ChangeRequest.create({ account: account._id, message });
    await notifyNewRequest(account, request);
    res.status(201).json(toRequestJSON(request));
}

/** PATCH /api/requests/:id { status } -> the updated request. only for me (requireAdmin) */
export async function setStatus(req: Request<{ id: string }>, res: Response<InboxJSON>): Promise<void> {
    const { status } = (req.body ?? {}) as { status?: unknown };
    if (!isStatus(status)) {
        throw new HttpError(400, `The status has to be one of: ${STATUSES.join(', ')}.`);
    }

    // returnDocument: 'after' hands back the request as it is now, not as it was before the change
    const request = await ChangeRequest.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' }).populate<{ account: Owner }>('account', 'businessName email');
    if (request === null) throw new HttpError(404, 'There is no request with that id.');
    res.json(toInboxJSON(request));
}
