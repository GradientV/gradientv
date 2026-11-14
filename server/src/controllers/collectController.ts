// the controllers a client's website talks to
// every one of these runs behind requireSiteKey, so the account is the client the
// key belongs to. the website on the other end already checked what its visitor
// sent. it gets checked again here anyway: this is the last stop before the database
import type { Request, Response } from 'express';
import { AssessmentResult } from '../models/AssessmentResult.js';
import { Subscriber } from '../models/Subscriber.js';
import { HttpError } from '../middleware/errorHandlers.js';
import { accountOf } from '../middleware/requireAuth.js';
import { addSubscriber, cleanAssessment, cleanSubscriber, countToday, type Countable, type Owner } from '../services/siteData.js';

// far more than a real day brings, and it stops a bot hammering a client's form
// from filling the database (the free one holds 512 MB, shared by every client)
const MAX_PER_DAY = 500;

async function stopFloods(Model: Countable, account: Owner): Promise<void> {
    if (await countToday(Model, account) >= MAX_PER_DAY) {
        throw new HttpError(429, 'That is more than a day normally brings. Nothing more is saved until tomorrow.');
    }
}

/** POST /api/collect/assessment { type, score, riskLevel, label? } */
export async function collectAssessment(req: Request, res: Response<{ ok: true }>): Promise<void> {
    const account = accountOf(req);
    const result = cleanAssessment(req.body);
    await stopFloods(AssessmentResult, account);

    await AssessmentResult.create({ account: account._id, ...result });
    res.status(201).json({ ok: true });
}

/** POST /api/collect/subscriber { email, sourcePage? } */
export async function collectSubscriber(req: Request, res: Response<{ ok: true }>): Promise<void> {
    const account = accountOf(req);
    const subscriber = cleanSubscriber(req.body);
    await stopFloods(Subscriber, account);

    // the answer is the same whether the address was new or already on the list
    await addSubscriber(account, subscriber);
    res.status(201).json({ ok: true });
}
