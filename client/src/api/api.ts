// where the client talks with the server.
// the components never touch fetch, URLs or status codes. they call
// api.signIn(email, password) and get data back, or an ApiError with a readable message.
//
// every address starts with /api. on my laptop Vite passes those along to Express
// (vite.config.ts), on Vercel the rewrite in vercel.json does. either way the browser
// only ever talks to the site it's on, so the session cookie rides along by itself.
//
// what each call gives back is typed from shared/portal.ts, the same file the
// server's DTOs are typed from, so the two sides can't quietly drift apart
import type {
    AccountJSON,
    AssessmentSummaryJSON,
    ErrorJSON,
    InboxJSON,
    InviteJSON,
    RequestJSON,
    RequestStatus,
    SiteStatsJSON,
    SubscriberListJSON
} from '../../../shared/portal';

// just a custom error type. the extra field status holds the server's response code
export class ApiError extends Error {
    status: number | null;

    constructor(message: string, status: number | null = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

/** what went wrong, in words, whatever was thrown */
export function messageOf(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

/** the status the server uses for "the portal can't be reached", so LoginView can tell it apart from a wrong password */
export const PORTAL_CLOSED = 503;

// not exported so only this file uses this.
// every request goes through this function. Data is what that address sends back
async function send<Data>(method: string, url: string, body?: unknown): Promise<Data> {
    let response: Response;
    try {
        response = await fetch(url, {
            method,
            headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
            body: body === undefined ? undefined : JSON.stringify(body)
        });
    } catch {
        // fetch only rejects when nothing answered at all
        throw new ApiError('The GradientV server could not be reached.');
    }

    // 204 is an answer with nothing in it (signing out)
    if (response.status === 204) return null as Data;

    const data: unknown = await response.json().catch(() => null);
    if (!response.ok) {
        const message = (data as Partial<ErrorJSON> | null)?.error;
        throw new ApiError(message ?? `The server answered ${response.status}.`, response.status);
    }
    return data as Data;
}

// ---------- signing in and out ----------

/** the account that just signed in */
export function signIn(email: string, password: string): Promise<AccountJSON> {
    return send('POST', '/api/auth/login', { email, password });
}

export function signOut(): Promise<null> {
    return send('POST', '/api/auth/logout');
}

/** whoever is signed in. throws a 401 ApiError when nobody is */
export function getMe(): Promise<AccountJSON> {
    return send('GET', '/api/auth/me');
}

// ---------- the invite link ----------

/** { businessName, email } for a link that still works */
export function getInvite(token: string): Promise<InviteJSON> {
    return send('POST', '/api/auth/invite', { token });
}

/** saves the password, uses up the link, and signs in. gives back the account */
export function setPassword(token: string, password: string): Promise<AccountJSON> {
    return send('POST', '/api/auth/set-password', { token, password });
}

// ---------- the request box ----------

/** a client's own requests, newest first */
export function listRequests(): Promise<RequestJSON[]> {
    return send('GET', '/api/requests');
}

/** the admin gets everyone's from the same address, each with whose it is */
export function listInbox(): Promise<InboxJSON[]> {
    return send('GET', '/api/requests');
}

/** the request that was just made */
export function createRequest(message: string): Promise<RequestJSON> {
    return send('POST', '/api/requests', { message });
}

/** admin only. the request with its new status */
export function setRequestStatus(id: string, status: RequestStatus): Promise<InboxJSON> {
    return send('PATCH', `/api/requests/${id}`, { status });
}

// ---------- site stats ----------

/** the signed-in client's own site, 7 or 30 days back. there's nothing to pass for which site, the server knows from the login */
export function getStats(days: number): Promise<SiteStatsJSON> {
    return send('GET', `/api/stats?days=${days}`);
}

// ---------- what the client's own site collected ----------
// only for clients whose website sends things to the portal (account.siteSendsData)

/** the self-assessments finished on their site: { total, last30, byType, recent } */
export function getAssessments(): Promise<AssessmentSummaryJSON> {
    return send('GET', '/api/site-data/assessments');
}

/** their newsletter signups, newest first: { total, subscribers } */
export function getSubscribers(): Promise<SubscriberListJSON> {
    return send('GET', '/api/site-data/subscribers');
}
