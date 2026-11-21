// one "Build your plan" form someone sent from the public site: the packages they
// picked, who they are, and how to reach them. it isn't tied to a login, because
// whoever sends it isn't a client yet
import mongoose from 'mongoose';
import type { PackageId, RequestStatus } from '../../../shared/portal.js';
import { STATUSES } from './ChangeRequest.js';

/** the packages a plan can include, in the order the site shows them */
export const PACKAGE_IDS: readonly PackageId[] = ['website', 'growth', 'automation', 'custom', 'ai'];

/** their names, for the Slack message. the site has its own words for them in every language */
export const PACKAGE_NAMES: Record<PackageId, string> = {
    website: 'Website & Brand',
    growth: 'Growth',
    automation: 'Automation',
    custom: 'Custom Software',
    ai: 'AI Upgrade'
};

/** the languages the form can be filled in */
export const PLAN_LOCALES = ['en', 'es', 'zh'] as const;

/** the longest each field may be. the form stops at the same numbers */
export const PLAN_LIMITS = {
    name: 100,
    email: 200,
    phone: 40,
    businessName: 120,
    businessType: 80,
    message: 2000
} as const;

export function isPackageId(value: unknown): value is PackageId {
    return PACKAGE_IDS.some((id) => id === value);
}

/** what a PlanRequest holds. the optional fields are left out when the form left them empty */
export type PlanRequestFields = {
    packages: PackageId[];
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    businessType?: string;
    message?: string;
    locale: string;
    status: RequestStatus;
    createdAt: Date;
    updatedAt: Date;
};

const planRequestSchema = new mongoose.Schema<PlanRequestFields>({
    packages: {
        type: [{ type: String, enum: PACKAGE_IDS }],
        validate: { validator: (packages: string[]) => packages.length > 0, message: 'Pick at least one package.' }
    },
    name: { type: String, required: true, trim: true, maxlength: PLAN_LIMITS.name },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: PLAN_LIMITS.email },
    phone: { type: String, trim: true, maxlength: PLAN_LIMITS.phone },
    businessName: { type: String, trim: true, maxlength: PLAN_LIMITS.businessName },
    businessType: { type: String, trim: true, maxlength: PLAN_LIMITS.businessType },
    message: { type: String, trim: true, maxlength: PLAN_LIMITS.message },
    locale: { type: String, enum: PLAN_LOCALES, default: 'en' },
    // the same three steps as a change request, and only i move them along
    status: { type: String, enum: STATUSES, default: 'new' }
}, { timestamps: true });

// the daily limits count by date, so that's what gets the index
planRequestSchema.index({ createdAt: -1 });

export const PlanRequest = mongoose.model<PlanRequestFields>('PlanRequest', planRequestSchema);
