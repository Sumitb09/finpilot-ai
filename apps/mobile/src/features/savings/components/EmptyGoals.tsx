import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import Button from "../../../components/ui/Button";
import Typography from "../../../components/ui/Typography";

type Props = {
  onPress(): void;
};

export default function EmptyGoals({
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <Typography
        variant="h2"
      >
        🎯
      </Typography>

      <Typography
        variant="h3"
        style={{
          marginTop: 12,
        }}
      >
        No Savings Goals
      </Typography>

      <Typography
        style={{
          marginTop: 8,
          textAlign: "center",
        }}
      >
        Create your first savings
        goal and start tracking
        your progress.
      </Typography>

      <Button
        title="Create Goal"
        onPress={onPress}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
      padding: 24,
    },
  });