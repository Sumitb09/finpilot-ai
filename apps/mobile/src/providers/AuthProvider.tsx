import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Session,
} from "@supabase/supabase-js";

import { supabase } from "../lib/supabase/client";

type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

const AuthContext =
  createContext<AuthContextType>({
    session: null,
    loading: true,
  });

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] =
    useState<Session | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function initialize() {
      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      setSession(session);

      setLoading(false);
    }

    initialize();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        }
      );

    return () =>
      subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}