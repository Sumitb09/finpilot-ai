import { useEffect } from "react";
import { router } from "expo-router";
import { useAuthStore } from "../store/auth/authStore";

type Props = {
  children: React.ReactNode;
};

export default function AuthGate({ children }: Props) {
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    if (session) {
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, [session]);

  return <>{children}</>;
}