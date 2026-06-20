import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import Screen from "../../../components/ui/Screen";
import { signUp } from "../../../services/auth/auth.service";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const { error } = await signUp(email.trim(), password);

    if (error) {
      Alert.alert("Registration Failed", error.message);
      return;
    }

    Alert.alert(
      "Success",
      "Check your email to verify your account."
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => router.back()}
      >
        <Text
          style={{
          color: "#60A5FA",
          textAlign: "center",
          }}
        >
          Already have an account? Login
        </Text>
      </TouchableOpacity>

    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 60,
    marginBottom: 40,
  },

  input: {
    backgroundColor: "#1E293B",
    color: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },
});