import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  text: string;
  action: string;
  onPress(): void;
};

export default function AuthFooter({
  text,
  action,
  onPress,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: palette.subtext,
        }}
      >
        {text}
      </Text>

      <Pressable
        onPress={onPress}
      >
        <Text
          style={[
            styles.action,
            {
              color:
                palette.primary,
            },
          ]}
        >
          {action}
        </Text>
      </Pressable>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 24,

      flexDirection: "row",

      justifyContent:
        "center",
    },

    action: {
      fontWeight: "700",

      marginLeft: 6,
    },
  });