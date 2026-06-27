import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import Button from "../ui/Button";
import Typography from "../ui/Typography";

import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  icon?: string;
  title: string;
  description?: string;
  buttonTitle?: string;
  onPress?(): void;
};

export default function EmptyState({
  icon = "📂",
  title,
  description,
  buttonTitle,
  onPress,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.container}>
      <Typography style={styles.icon}>
        {icon}
      </Typography>

      <Typography
        variant="h2"
        style={[
          styles.title,
          {
            color: palette.text,
          },
        ]}
      >
        {title}
      </Typography>

      {!!description && (
        <Typography
          style={[
            styles.description,
            {
              color: palette.subtext,
            },
          ]}
        >
          {description}
        </Typography>
      )}

      {!!buttonTitle && onPress && (
        <Button
          title={buttonTitle}
          onPress={onPress}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 280,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  icon: {
    fontSize: 64,
    marginBottom: 20,
  },

  title: {
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },

  button: {
    minWidth: 180,
  },
});