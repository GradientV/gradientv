// lets me look at a client's portal the way they see it
// every route answers for the signed-in account. when i add ?as=<a client's id> to a
// request, this swaps req.account for that client before the route runs, so the route
// answers exactly as it would for them. it goes after requireAuth.
//
// everywhere else, "which client" never comes from the browser. this is the one
// exception, so it's strict:
//   only the admin login may use it. anyone else gets a 403, not a peek
//   only for reading (GET). nothing can be sent or changed as somebody else
//   only clients can be viewed, not another admin
import type { NextFunction, Request, Response } from 'express';
import { Account } from '../models/Account.js';
import { HttpError } from './errorHandlers.js';
import { accountOf } from './requireAuth.js';

export async function viewAs(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const id: unknown = req.query.as;
    if (id === undefined) return next();

    const me = accountOf(req);
    if (me.role !== 'admin') throw new HttpError(403, 'Only GradientV can do that.');
    if (req.method !== 'GET') throw new HttpError(403, 'Viewing as a client is read only.');
    // ?as=one&as=two arrives as a list. an id is one piece of text
    if (typeof id !== 'string') throw new HttpError(400, 'as has to be one client id.');

    const client = await Account.findOne({ _id: id, role: 'client' });
    if (client === null) throw new HttpError(404, 'There is no client with that id.');

    // who is really signed in, in case a route ever needs to know
    req.viewer = me;
    req.account = client;
    next();
}
