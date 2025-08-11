import React, { createContext, useContext, useEffect, useState } from 'react'
import {
    type User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth'

import { auth } from '@/utils/firebaseConfig'

import type { AuthContextType } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        console.log("No Auth found")
    }
    return context
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            console.log('Auth state changed:', user ? user.email : 'No user');
        });

        return unsubscribe;
    }, []);

    const signup = async (email: string, password: string, displayName?: string) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)

            if (displayName && user) {
                await updateProfile(user, { displayName })
            }

            console.log("User Signed up: ", user.email)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            console.log('User signed in')
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            console.log('user logged out')
        } catch (e) {
            console.log(e)
        }
    }

    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (e) {
            console.log(e)
        }
    }

    const value: AuthContextType = {
        user,
        loading,
        signup,
        login,
        logout,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            <div>{children}</div>
        </AuthContext.Provider>
    );
};

export default AuthProvider