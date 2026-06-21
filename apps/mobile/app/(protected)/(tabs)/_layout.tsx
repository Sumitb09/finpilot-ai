import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {
  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#111827",
            borderTopColor: "#1E293B",
          },
          tabBarActiveTintColor: "#2563EB",
          tabBarInactiveTintColor: "#94A3B8",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="settings"
                color={color}
                size={size}
              />
            ),
         }}
        />
      </Tabs>
  );
}