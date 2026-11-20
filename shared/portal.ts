// the shapes the portal's API sends back as JSON, in one place both sides use:
// the server's DTOs (server/src/dto/) promise to return exactly these, and the
// client's pages read them. change a shape here and TypeScript points at every
// place on either side that has to change with it.
// types only: nothing in this file runs, so it adds nothing to the site or the server

/** who a login belongs to: a client, or me */
export type Role = 'client' | 'admin';
/** where a change request stands. only i move them along */
export type RequestStatus = 'new' | 'in progress' | 'done';
/** how a finished self-assessment came out */
export type RiskLevel = 'low' | 'medium' | 'high';

/** whoever is signed in (GET /api/auth/me, and the answer to signing in) */
export type AccountJSON = {
    id: string;
    businessName: string;
    email: string;
    role: Role;
    /** true when their own website sends results and signups here */
    siteSendsData: boolean;
};

/** one row of the admin's list of clients (GET /api/admin/clients), for the "view as" menu */
export type ClientJSON = AccountJSON & {
    /** false until they open their invite link and pick a password */
    hasSignedUp: boolean;
};

/** whose login an invite link is for (POST /api/auth/invite) */
export type InviteJSON = {
    businessName: string;
    email: string;
};

/** one change request, as its client sees it */
export type RequestJSON = {
    id: string;
    message: string;
    status: RequestStatus;
    /** an ISO date */
    createdAt: string;
};

/** one change request in my inbox: the same, plus whose it is */
export type InboxJSON = RequestJSON & {
    businessName: string;
    email: string;
};

/** one finished self-assessment on a client's site. nothing on it says who took it */
export type AssessmentJSON = {
    id: string;
    type: string;
    score: number;
    riskLevel: RiskLevel;
    createdAt: string;
};

/** GET /api/site-data/assessments */
export type AssessmentSummaryJSON = {
    total: number;
    last30: number;
    byType: Array<{
        type: string;
        label: string | null;
        count: number;
        averageScore: number;
        low: number;
        medium: number;
        high: number;
    }>;
    recent: AssessmentJSON[];
};

/** one newsletter signup on a client's site */
export type SubscriberJSON = {
    id: string;
    email: string;
    sourcePage: string | null;
    createdAt: string;
};

/** GET /api/site-data/subscribers. subscribers stops at the newest 1,000 */
export type SubscriberListJSON = {
    total: number;
    subscribers: SubscriberJSON[];
};

/** GET /api/stats?days=7 */
export type SiteStatsJSON = {
    days: number;
    totals: { visitors: number; pageviews: number };
    daily: Array<{ date: string; visitors: number; pageviews: number }>;
    pages: Array<{ path: string; pageviews: number }>;
    sources: Array<{ name: string; visitors: number }>;
};

/** the four packages a plan can be built from. the server checks against this, and the site draws a card for each */
export type PackageId = 'website' | 'growth' | 'automation' | 'custom';

/** what the "Build your plan" form sends (POST /api/plan). anyone can send it, so the server checks every field */
export type PlanRequestBody = {
    packages: PackageId[];
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    businessType?: string;
    message?: string;
    /** the language the form was filled in, so i can answer in it */
    locale?: string;
    /** the hidden field people never see. only a bot fills it in */
    homepage?: string;
};

/** one plan request in my inbox (GET /api/admin/plans). only the admin login ever gets these */
export type PlanJSON = {
    id: string;
    packages: PackageId[];
    name: string;
    email: string;
    phone: string | null;
    businessName: string | null;
    businessType: string | null;
    message: string | null;
    locale: string;
    status: RequestStatus;
    /** an ISO date */
    createdAt: string;
};

/** what every error answer looks like */
export type ErrorJSON = {
    error: string;
};
