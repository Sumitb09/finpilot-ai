import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import Screen from "../../../components/ui/Screen";
import { signIn } from "../../../services/auth/auth.service";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const { error } = await signIn(email.trim(), password);

      if (error) {
        Alert.alert("Login Failed", error.message);
        return;
      }

      router.replace("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Welcome Back 👋</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
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
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing In..." : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => router.push("/register")}
      >
        <Text
          style={{
          color: "#60A5FA",
          textAlign: "center",
          }}
        >
          Don't have an account? Register
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
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },
});