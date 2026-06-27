import { Stack, Redirect } from "expo-router";

import { useAuth } from "../../src/providers/AuthProvider";

export default function ProtectedLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}