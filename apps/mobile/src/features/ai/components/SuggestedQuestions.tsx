import React from "react";
import {
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";

import { suggestedQuestions } from "../constants/questions";

type Props = {
  onSelect(question: string): void;
};

export default function SuggestedQuestions({
  onSelect,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {suggestedQuestions.map((question) => (
        <Pressable
          key={question.id}
          onPress={() =>
            onSelect(question.title)
          }
          style={[
            styles.button,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}
        >
          <Typography>
            {question.title}
          </Typography>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },

  button: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },
});