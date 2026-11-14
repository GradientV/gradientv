// teaches TypeScript about req.account: the login a request belongs to.
// only requireAuth and requireSiteKey set it, and routes read it through accountOf()
import type { AccountDocument } from '../models/Account.js';

declare global {
    namespace Express {
        interface Request {
            account?: AccountDocument;
            /** only while the admin views a client's portal (viewAs): who is really signed in */
            viewer?: AccountDocument;
        }
    }
}

export {};
