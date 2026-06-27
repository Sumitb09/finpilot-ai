import React from "react";
import {
  StyleSheet,
  View,
  ViewProps,
} from "react-native";

import Typography from "./Typography";
import { useAppTheme } from "../../theme/useAppTheme";

type Props = ViewProps & {
  title?: string;
  description?: string;
};

export default function FormSection({
  title,
  description,
  children,
  style,
  ...props
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View
      {...props}
      style={[styles.container, style]}
    >
      {!!title && (
        <Typography
          variant="h3"
          style={[
            styles.title,
            {
              color: palette.text,
            },
          ]}
        >
          {title}
        </Typography>
      )}

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

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  title: {
    marginBottom: 6,
  },

  description: {
    marginBottom: 18,
    lineHeight: 22,
  },
});