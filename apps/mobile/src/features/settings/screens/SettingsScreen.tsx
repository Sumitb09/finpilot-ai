import React from "react";
import { Alert } from "react-native";
import { router } from "expo-router";

import Screen from "../../../components/ui/Screen";

import AvatarCard from "../components/AvatarCard";
import SettingsItem from "../components/SettingsItem";
import SettingsSection from "../components/SettingsSection";

import { signOut } from "../../../services/auth/auth.service";

export default function SettingsScreen() {
  async function handleLogout() {
    await signOut();
    router.replace("/login");
  }

  return (
    <Screen>
      <AvatarCard
        name="Sumit Bharti"
        email="sumitb9065@gmail.com"
      />

      <SettingsSection title="ACCOUNT">
        <SettingsItem
          icon="👤"
          title="Edit Profile"
          onPress={() =>
            router.push("/edit-profile")
          }
        />

        <SettingsItem
          icon="🌎"
          title="Language"
          value="English"
          onPress={() =>
            Alert.alert("Coming Soon")
          }
        />

        <SettingsItem
          icon="🌙"
          title="Theme"
          value="Dark"
          onPress={() =>
            router.push("/theme")
          }
        />

        <SettingsItem
          icon="💰"
          title="Currency"
          value="INR"
          onPress={() =>
            Alert.alert("Coming Soon")
          }
        />
      </SettingsSection>

      <SettingsSection title="FINANCE">
        <SettingsItem
          icon="💵"
          title="Monthly Income"
          value="₹0"
          onPress={() =>
            Alert.alert("Coming Soon")
          }
        />

        <SettingsItem
          icon="🎯"
          title="Monthly Budget"
          value="₹0"
          onPress={() =>
            Alert.alert("Coming Soon")
          }
        />
      </SettingsSection>

      <SettingsSection title="SECURITY">
        <SettingsItem
          icon="🔑"
          title="Change Password"
          onPress={() =>
            Alert.alert("Coming Soon")
          }
        />

        <SettingsItem
          icon="🗑️"
          title="Delete Account"
          danger
          onPress={() =>
            Alert.alert("Coming Soon")
          }
        />

        <SettingsItem
          icon="🚪"
          title="Logout"
          danger
          onPress={handleLogout}
        />
      </SettingsSection>
    </Screen>
  );
}