// the four packages, in the order the site shows them. the words for each one are in
// src/content (packages.items), the ids in shared/portal.ts, and the server checks
// against its own copy of this list (server/src/models/PlanRequest.ts)
import type { PackageId } from '../../../shared/portal';

export const PACKAGE_IDS: readonly PackageId[] = ['website', 'growth', 'automation', 'custom'];

/**
 * the packages named in a link like /plan?package=growth,automation: only real ids,
 * each once, in the site's order. the home page's "Add to your plan" links use it
 */
export function packagesFromQuery(value: string | null): PackageId[] {
    if (!value) return [];
    const asked = value.split(',').map((id) => id.trim());
    return PACKAGE_IDS.filter((id) => asked.includes(id));
}
