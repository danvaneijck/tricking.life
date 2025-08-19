// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, useContext } from 'react';
import type { User } from 'firebase/auth';
import type { ReactNode } from 'react';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

// New interface for our user profile data from Firestore
export interface UserProfile {
    email: string;
    role: 'user' | 'admin';
}

interface AuthContextType {
    currentUser: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    userProfile: null,
    loading: true,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            if (user) {
                // User is logged in, now fetch their profile from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserProfile(userDoc.data() as UserProfile);
                } else {
                    // Handle case where user exists in Auth but not in Firestore
                    // For now, we'll treat them as a regular user
                    setUserProfile({ email: user.email || '', role: 'user' });
                }
            } else {
                // User is logged out
                setUserProfile(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userProfile,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};