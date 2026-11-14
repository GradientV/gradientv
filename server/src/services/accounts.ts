// making accounts and their invite links
// scripts/add-client.ts uses this today. the admin page will use the same function later
import type { Role } from '../../../shared/portal.js';
import { Account, type AccountDocument } from '../models/Account.js';
import { hashToken, newToken } from './sessions.js';

const DAY = 24 * 60 * 60 * 1000;
export const INVITE_DAYS = 7;

type InviteDetails = { businessName?: string; email: string; vercelProject?: string; role?: Role };

/**
 * Makes the account if the email is new, then gives it a fresh invite link.
 * For an email that already has an account it only swaps the link, which is how
 * a forgotten password gets fixed: the old password keeps working until they
 * use the new link.
 * The token goes in the link. It is not saved anywhere.
 */
export async function inviteAccount({ businessName, email, vercelProject, role }: InviteDetails): Promise<{ account: AccountDocument; token: string; isNew: boolean }> {
    const token = newToken();
    const existing = await Account.findOne({ email: email.trim().toLowerCase() });
    const account = existing ?? new Account({ email });

    if (businessName) account.businessName = businessName;
    if (vercelProject) account.vercelProject = vercelProject;
    if (role) account.role = role;
    account.inviteHash = hashToken(token);
    account.inviteExpiresAt = new Date(Date.now() + INVITE_DAYS * DAY);
    await account.save();

    return { account, token, isNew: existing === null };
}

/**
 * Gives an account the key its own website uses to send things to the portal.
 * A key that is already there is left alone unless replace is true, because the
 * moment it changes, the site stops getting through until the new key is put in.
 * The key is shown once. It is not saved anywhere.
 */
export async function giveSiteKey(email: string, { replace = false }: { replace?: boolean } = {}): Promise<{ account: AccountDocument | null; key: string | null; hadKey: boolean }> {
    const account = await Account.findOne({ email: String(email).trim().toLowerCase() });
    if (account === null) return { account: null, key: null, hadKey: false };

    const hadKey = Boolean(account.siteKeyHash);
    if (hadKey && !replace) return { account, key: null, hadKey };

    // the front part is only so i can tell what it is when i see it in Vercel's settings
    const key = `gvsite_${newToken()}`;
    account.siteKeyHash = hashToken(key);
    await account.save();
    return { account, key, hadKey };
}

/** the account a site key belongs to, or null */
export async function findBySiteKey(key: unknown): Promise<AccountDocument | null> {
    if (typeof key !== 'string' || key === '') return null;
    return Account.findOne({ siteKeyHash: hashToken(key) });
}

/** the account an invite link belongs to, or null when the link is wrong, used up, or too old */
export async function findInvited(token: unknown): Promise<AccountDocument | null> {
    // a token must be plain text. anything else (like an object) could be read by Mongo as a query
    if (typeof token !== 'string' || token === '') return null;

    const account = await Account.findOne({ inviteHash: hashToken(token) });
    if (account === null || account.inviteExpiresAt === null || account.inviteExpiresAt <= new Date()) return null;
    return account;
}
