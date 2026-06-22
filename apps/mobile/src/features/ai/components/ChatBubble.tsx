import React from "react";
import { View, StyleSheet } from "react-native";

import Markdown from "react-native-markdown-display";

import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  text: string;
  isUser: boolean;
  createdAt?: string;
};

export default function ChatBubble({
  text,
  isUser,
  createdAt,
}: Props) {
  const { palette } = useAppTheme();

  const time = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <View
      style={[
        styles.wrapper,
        {
          justifyContent: isUser
            ? "flex-end"
            : "flex-start",
        },
      ]}
    >
      {!isUser && (
        <Typography style={styles.avatar}>
          🤖
        </Typography>
      )}

      <View
        style={[
          styles.container,
          {
            backgroundColor: isUser
              ? palette.primary
              : palette.card,
          },
        ]}
      >
        <Markdown
          style={{
            body: {
              color: isUser
                ? "#fff"
                : palette.text,
              fontSize: 16,
              margin: 0,
            },
          }}
        >
          {text}
        </Markdown>

        {!!time && (
          <Typography
            style={[
              styles.time,
              {
                color: isUser
                  ? "#E2E8F0"
                  : palette.subtext,
              },
            ]}
          >
            {time}
          </Typography>
        )}
      </View>

      {isUser && (
        <Typography style={styles.avatar}>
          👤
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
  },

  avatar: {
    fontSize: 22,
    marginHorizontal: 8,
  },

  container: {
    maxWidth: "80%",
    padding: 14,
    borderRadius: 18,
  },

  time: {
    alignSelf: "flex-end",
    marginTop: 8,
    fontSize: 11,
  },
});