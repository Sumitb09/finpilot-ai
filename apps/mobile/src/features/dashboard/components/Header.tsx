import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good Morning 👋</Text>

      <Text style={styles.name}>Sumit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 24,
  },

  greeting: {
    color: "#94A3B8",
    fontSize: 16,
  },

  name: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 6,
  },
});
