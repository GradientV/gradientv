// what the admin login gets sent for a plan request. nobody else ever sees these
import type { Types } from 'mongoose';
import type { PlanJSON } from '../../../shared/portal.js';
import type { PlanRequestFields } from '../models/PlanRequest.js';

type PlanLike = Omit<PlanRequestFields, 'updatedAt'> & { _id: Types.ObjectId };

export function toPlanJSON(plan: PlanLike): PlanJSON {
    return {
        id: String(plan._id),
        packages: [...plan.packages],
        name: plan.name,
        email: plan.email,
        phone: plan.phone ?? null,
        businessName: plan.businessName ?? null,
        businessType: plan.businessType ?? null,
        message: plan.message ?? null,
        locale: plan.locale,
        status: plan.status,
        createdAt: plan.createdAt.toISOString()
    };
}
