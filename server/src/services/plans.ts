// checking what the "Build your plan" form sent. anyone on the internet can send it,
// so every field is treated as unknown until it passes here. the form in the browser
// checks the same things first, so a real person almost never sees these messages
import type { PackageId } from '../../../shared/portal.js';
import { HttpError } from '../middleware/errorHandlers.js';
import { isPackageId, PACKAGE_IDS, PLAN_LIMITS, PLAN_LOCALES } from '../models/PlanRequest.js';

// "something @ something . something", no spaces. the real test of an address is whether mail arrives
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** a plan after the checks. the optional fields are left out when they were empty */
export type CleanPlan = {
    packages: PackageId[];
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    businessType?: string;
    message?: string;
    locale: string;
};

/** a field that may be left empty. missing, null and '' all mean "not given" */
function optional(value: unknown, field: string, max: number): string | undefined {
    if (value == null) return undefined;
    if (typeof value !== 'string') throw new HttpError(400, `${field} has to be text.`);
    const text = value.trim();
    if (text.length > max) throw new HttpError(400, `${field} has to be ${max} characters at most.`);
    return text || undefined;
}

/** a field that has to be there */
function required(value: unknown, field: string, max: number): string {
    const text = optional(value, field, max);
    if (text === undefined) throw new HttpError(400, `${field} is missing.`);
    return text;
}

/** Checks one plan request. Throws a 400 that says what is wrong with it. */
export function cleanPlan(body: Record<string, unknown>): CleanPlan {
    const { packages } = body;
    if (!Array.isArray(packages) || packages.length === 0) {
        throw new HttpError(400, 'Pick at least one package.');
    }
    if (!packages.every(isPackageId)) {
        throw new HttpError(400, `packages can only be: ${PACKAGE_IDS.join(', ')}.`);
    }

    const email = required(body.email, 'email', PLAN_LIMITS.email).toLowerCase();
    if (!EMAIL_PATTERN.test(email)) throw new HttpError(400, 'email has to be an email address.');

    const locale = PLAN_LOCALES.find((code) => code === body.locale) ?? 'en';

    return {
        // the order the site shows them in, each once, whatever order they arrived in
        packages: PACKAGE_IDS.filter((id) => packages.includes(id)),
        name: required(body.name, 'name', PLAN_LIMITS.name),
        email,
        phone: optional(body.phone, 'phone', PLAN_LIMITS.phone),
        businessName: optional(body.businessName, 'businessName', PLAN_LIMITS.businessName),
        businessType: optional(body.businessType, 'businessType', PLAN_LIMITS.businessType),
        message: optional(body.message, 'message', PLAN_LIMITS.message),
        locale
    };
}
