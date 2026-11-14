// who is signed in, shared with the pages that care (login, set-password, the portal).
// the browser can't read the session cookie, that's the point of it. so the only
// way to know who is signed in is to ask the server, which this does once when it loads
//
// any component inside <AuthProvider> calls useAuth() and gets:
//   status        'checking' | 'signedIn' | 'signedOut'
//   account       { businessName, email, role, ... } or null
//   signIn(email, password)
//   setPassword(token, password)    for the invite link. it signs them in too
//   signOut()
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AccountJSON } from '../../../shared/portal';
import * as api from '../api/api';

/** where things stand. an account only exists while signed in, so a page can't read one that isn't there */
type AuthState =
    | { status: 'checking'; account: null }
    | { status: 'signedOut'; account: null }
    | { status: 'signedIn'; account: AccountJSON };

type AuthValue = AuthState & {
    signIn: (email: string, password: string) => Promise<void>;
    setPassword: (token: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

export function useAuth(): AuthValue {
    const value = useContext(AuthContext);
    if (value === null) throw new Error('useAuth must be used inside an <AuthProvider>');
    return value;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({ status: 'checking', account: null });

    // at startup, ask the server who this is
    // btw StrictMode runs effects twice in dev, the ignore flag makes the extra run harmless
    useEffect(() => {
        let ignore = false;
        api.getMe()
            .then((found) => {
                if (!ignore) welcome(found);
            })
            .catch(() => {
                // only if it's still an open question. someone quick could have signed in before this answer came back
                if (!ignore) setState((current) => (current.status === 'checking' ? { status: 'signedOut', account: null } : current));
            });
        return () => { ignore = true; };
    }, []);

    function welcome(found: AccountJSON) {
        setState({ status: 'signedIn', account: found });
    }

    const value: AuthValue = {
        ...state,
        async signIn(email, password) {
            welcome(await api.signIn(email, password));
        },
        async setPassword(token, password) {
            welcome(await api.setPassword(token, password));
        },
        async signOut() {
            await api.signOut();
            setState({ status: 'signedOut', account: null });
        }
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
