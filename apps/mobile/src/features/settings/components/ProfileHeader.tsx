import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

type Props = {
  name: string;
  email: string;
  avatar?: string | null;
};

export default function ProfileHeader({
  name,
  email,
  avatar,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            avatar ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(name),
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  email: {
    color: "#94A3B8",
    marginTop: 6,
  },
});