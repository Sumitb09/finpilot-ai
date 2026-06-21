import React, { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

const AuthContext = createContext({
  session: null as Session | null,
  loading: true,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider mounted");

    setTimeout(() => {
      console.log("Finished loading");
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        session: null,
        loading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}