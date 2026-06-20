import { ReactNode, useEffect } from "react";
import { supabase } from "../lib/supabase/client";
import { useAuthStore } from "../store/auth/authStore";
import AuthGate from "../components/AuthGate";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({
  children,
}: Props) {
  const setSession = useAuthStore(
    (state) => state.setSession
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthGate>
      {children}
    </AuthGate>
  );
}