'use client'

import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import User from '~/types/User';

interface AuthContextType {
  isLogged: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  isLoading: true,
  isAdmin: false,
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      setIsLoading(true);
      if (!user) {
        setIsLogged(false);
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      // Check if user is admin and get user data
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc:any = querySnapshot.docs[0];
        if (userDoc.data().role === 'Admin') {
          setIsAdmin(true);
        }
        setUser({id: userDoc.id, ...userDoc.data()});
      }
      setIsLogged(true);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLogged, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};