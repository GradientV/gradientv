// the bouncer. put it in front of any route only a signed-in client may use:
//     router.get('/me', requireAuth, me);
// it finds the session the cookie belongs to and leaves the account on req.account.
//
// this is also what keeps clients out of each other's things: a route never asks
// the browser which client it is. it reads req.account (through accountOf below),
// which only this file and requireSiteKey set
import type { NextFunction, Request, Response } from 'express';
import { Account, type AccountDocument } from '../models/Account.js';
import { findSession } from '../services/sessions.js';
import { HttpError } from './errorHandlers.js';

export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const session = await findSession(req);
    const account = session && await Account.findById(session.account);
    if (!account) throw new HttpError(401, 'Sign in to see this.');

    req.account = account;
    next();
}

/** goes after requireAuth, on the routes only i may use. a client gets a 403: signed in, but not allowed */
export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
    if (accountOf(req).role !== 'admin') throw new HttpError(403, 'Only GradientV can do that.');
    next();
}

/**
 * the account requireAuth (or requireSiteKey) left on the request.
 * routes behind one of them always have it, so a 401 here means a route was mounted without one
 */
export function accountOf(req: Request): AccountDocument {
    if (!req.account) throw new HttpError(401, 'Sign in to see this.');
    return req.account;
}
