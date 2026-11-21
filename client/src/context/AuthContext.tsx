// who is signed in, shared with the header, the footer and the login, set-password and portal pages.
// the browser can't read the session cookie, that's the point of it. so the only way to know
// who is signed in is to ask the server. it asks once, the first time someone lands on one of
// those three pages: someone reading the Story page shouldn't cost a trip to the server
//
// any component inside <AuthProvider> calls useAuth() and gets:
//   status        'checking' | 'signedIn' | 'signedOut'
//   account       { businessName, email, role, ... } or null
//   signIn(email, password)
//   setPassword(token, password)    for the invite link. it signs them in too
//   signOut()
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import type { AccountJSON } from '../../../shared/portal';
import * as api from '../api/api';
import { pageFromPath } from '../data/pages';

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

    const { pathname } = useLocation();
    const needsAnswer = pageFromPath(pathname)?.auth === true;
    // a ref so the question only goes out once, even with StrictMode running effects twice in dev
    const hasAsked = useRef(false);

    useEffect(() => {
        if (!needsAnswer || hasAsked.current) return;
        hasAsked.current = true;
        // both answers only count if it's still an open question: someone quick could have
        // signed in or out before this came back
        api.getMe()
            .then((found) => setState((current) => (current.status === 'checking' ? { status: 'signedIn', account: found } : current)))
            .catch(() => setState((current) => (current.status === 'checking' ? { status: 'signedOut', account: null } : current)));
    }, [needsAnswer]);

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
