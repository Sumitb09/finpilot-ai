import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, } from "react-native";
import Screen from "../../../components/ui/Screen";
import Button from "../../../components/ui/Button";
import AvatarCard from "../components/AvatarCard";
import ProfileInput from "../components/ProfileInput";
import CurrencyPicker from "../components/CurrencyPicker";

import {
  getProfile,
  updateProfile,
} from "../services/profile.service";

import { uploadAvatar } from "../services/avatar.service";

import { router } from "expo-router";

export default function EditProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [avatar, setAvatar] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [currency, setCurrency] =
    useState<string>("INR");

  const [income, setIncome] =
    useState("");

  const [budget, setBudget] =
    useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const profile = await getProfile();

      setName(profile.full_name);

      setEmail(profile.email ?? "");

      setAvatar(profile.avatar_url ?? "");

      setCurrency(profile.currency);

      setIncome(
        String(profile.monthly_income)
      );

      setBudget(
        String(profile.monthly_budget)
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function pickImage() {
    try {
      const url = await uploadAvatar();
  
      if (!url) return;
  
      setAvatar(url);
    } catch (e: any) {
      Alert.alert(
        "Upload Failed",
        e.message
      );
    }
  }

  async function handleSave() {
    try {
      setSaving(true);

      await updateProfile({
        full_name: name,
        avatar_url: avatar,
        currency,
        monthly_income:
          Number(income) || 0,
        monthly_budget:
          Number(budget) || 0,
      });

      Alert.alert(
        "Success",
        "Profile updated."
      );

      router.back();
    } catch (e) {
      console.log(e);

      Alert.alert(
        "Error",
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <Screen>
        <Text style={styles.loading}>
          Loading...
        </Text>
      </Screen>
    );

  return (
    <Screen>
      <AvatarCard
        avatar={avatar}
        onPress={pickImage}
      />

      <View style={styles.space} />

      <ProfileInput
        label="Full Name"
        value={name}
        onChangeText={setName}
      />

      <ProfileInput
        label="Email"
        value={email}
        editable={false}
      />

      <Text style={styles.label}>
        Currency
      </Text>

      <View style={styles.picker}>
        <CurrencyPicker
          value={currency}
          onChange={setCurrency}
        />
      </View>

      <ProfileInput
        label="Monthly Income"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />

      <ProfileInput
        label="Monthly Budget"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      <Button
        title="Save Profile"
        onPress={handleSave}
        loading={saving}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: {
    color: "white",
    marginTop: 50,
    textAlign: "center",
  },

  space: {
    height: 20,
  },

  label: {
    color: "white",
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },

  picker: {
    backgroundColor: "#1E293B",
    borderRadius: 14,
    marginBottom: 16,
  },
});