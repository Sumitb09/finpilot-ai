import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

type Props = {
  name?: string;
  email: string;
  avatar?: string |null;
  onPress?: () => void;
};

export default function AvatarCard({
  name,
  email,
  avatar,
  onPress,
}: Props) {
  const initials =
    name
      ?.split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
      >
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.initials}>
              {initials}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.changePhoto}>
        📷 Change Photo
      </Text>

      <Text style={styles.name}>
        {name}
      </Text>

      <Text style={styles.email}>
        {email}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  initials: {
    fontSize: 36,
    fontWeight: "700",
    color: "#334155",
  },

  changePhoto: {
    color: "#60A5FA",
    marginTop: 10,
    fontWeight: "600",
  },

  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 14,
  },

  email: {
    color: "#94A3B8",
    marginTop: 4,
  },
});