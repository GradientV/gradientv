// what the client actually gets sent for a change request
import type { Types } from 'mongoose';
import type { InboxJSON, RequestJSON } from '../../../shared/portal.js';
import type { ChangeRequestFields } from '../models/ChangeRequest.js';

type RequestLike = Pick<ChangeRequestFields, 'message' | 'status' | 'createdAt'> & { _id: Types.ObjectId };
/** a request with its account filled in (populate). the account is null when that login was deleted */
type InboxLike = RequestLike & { account: { businessName: string; email: string } | null };

/** what a client sees: their own request and where it stands */
export function toRequestJSON(request: RequestLike): RequestJSON {
    return {
        id: String(request._id),
        message: request.message,
        status: request.status,
        createdAt: request.createdAt.toISOString()
    };
}

/** what i see: the same, plus whose it is */
export function toInboxJSON(request: InboxLike): InboxJSON {
    return {
        ...toRequestJSON(request),
        businessName: request.account?.businessName ?? 'A deleted login',
        email: request.account?.email ?? ''
    };
}
