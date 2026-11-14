// one thing a client asked to have changed on their site
// (it's ChangeRequest and not Request so it never gets mixed up with Express's req)
import mongoose, { type Types } from 'mongoose';
import type { RequestStatus } from '../../../shared/portal.js';

// the order they move through. i'm the only one who moves them
export const STATUSES: readonly RequestStatus[] = ['new', 'in progress', 'done'];
export const MESSAGE_MAX = 2000;

export function isStatus(value: unknown): value is RequestStatus {
    return STATUSES.some((status) => status === value);
}

/** what a ChangeRequest holds */
export type ChangeRequestFields = {
    account: Types.ObjectId;
    message: string;
    status: RequestStatus;
    createdAt: Date;
    updatedAt: Date;
};

const changeRequestSchema = new mongoose.Schema<ChangeRequestFields>({
    // whose request it is. every query for a client filters on this, so it gets an index
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
    message: { type: String, required: true, trim: true, maxlength: MESSAGE_MAX },
    status: { type: String, enum: STATUSES, default: 'new' }
}, { timestamps: true });

export const ChangeRequest = mongoose.model<ChangeRequestFields>('ChangeRequest', changeRequestSchema);
