import React from "react";
import { Text, TextProps } from "react-native";

import { useAppTheme } from "../../theme/useAppTheme";

type Props = TextProps & {
  variant?: "h1" | "h2" | "h3" | "body" | "caption";
};

export default function Typography({
  variant = "body",
  style,
  ...props
}: Props) {
  const { palette } = useAppTheme();

  const sizes = {
    h1: 34,
    h2: 28,
    h3: 22,
    body: 16,
    caption: 13,
  };

  return (
    <Text
      {...props}
      style={[
        {
          color: palette.text,
          fontSize: sizes[variant],
        },
        style,
      ]}
    />
  );
}