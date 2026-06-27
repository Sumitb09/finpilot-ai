import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import Typography from "../../../components/ui/Typography";
import { useProfile } from "../../settings/hooks/useProfile";
import { useAppTheme } from "../../../theme/useAppTheme";

export default function DashboardHeader() {
  const { palette } = useAppTheme();
  const { data: profile } = useProfile();

  const hour = new Date().getHours();

  const greeting =
      hour < 12
      ? "Good Morning,"
      : hour < 17
      ? "Good Afternoon,"
      : "Good Evening,";

  return (
    <View style={styles.container}>
      <Typography
        style={{
          color: palette.subtext,
        }}
      >
        {greeting}
      </Typography>

      <Typography
        variant="h1"
        style={{
          marginTop: 4,
        }}
      >
        {profile?.full_name ??
          "User"}
      </Typography>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginBottom: 24,
    },
  });