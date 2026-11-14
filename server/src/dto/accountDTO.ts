// what the client actually gets sent
// an Account document also holds the password hash, the invite and the lock.
// none of that should ever leave the server, so only these fields get picked out
import type { Types } from 'mongoose';
import type { AccountJSON, InviteJSON } from '../../../shared/portal.js';
import type { AccountFields } from '../models/Account.js';

type AccountLike = Pick<AccountFields, 'businessName' | 'email' | 'role' | 'siteKeyHash'> & { _id: Types.ObjectId };

/** whoever is signed in, for the portal */
export function toAccountJSON(account: AccountLike): AccountJSON {
    return {
        id: String(account._id),
        businessName: account.businessName,
        email: account.email,
        role: account.role,
        // true when their own website sends things here (it has a site key).
        // the portal shows those clients two more cards. the key itself never leaves the server
        siteSendsData: Boolean(account.siteKeyHash)
    };
}

/** just enough for the set-password page to say whose login this is */
export function toInviteJSON(account: Pick<AccountFields, 'businessName' | 'email'>): InviteJSON {
    return {
        businessName: account.businessName,
        email: account.email
    };
}
