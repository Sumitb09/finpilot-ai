import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
} from "react-native";

import Typography from "../../../components/ui/Typography";
import Card from "../../../components/common/Card";
import { useAppTheme } from "../../../theme/useAppTheme";

type Range =
  | "7D"
  | "30D"
  | "3M"
  | "1Y";

type Props = {
  value: Range;
  onChange: (value: Range) => void;
};

const ranges: Range[] = [
  "7D",
  "30D",
  "3M",
  "1Y",
];

export default function AnalyticsHeader({
  value,
  onChange,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <Card style={styles.card}>
      <Typography
        variant="h2"
        style={styles.title}
      >
        📊 Analytics
      </Typography>

      <Typography
        style={{
          color: palette.subtext,
          marginBottom: 20,
        }}
      >
        Understand your spending
        behaviour over time.
      </Typography>

      <View style={styles.row}>
        {ranges.map((range) => (
          <Pressable
            key={range}
            onPress={() =>
              onChange(range)
            }
            style={[
              styles.chip,
              {
                backgroundColor:
                  value === range
                    ? palette.primary
                    : palette.card,
                borderColor:
                  palette.border,
              },
            ]}
          >
            <Typography
              style={{
                color:
                  value === range
                    ? "#FFF"
                    : palette.text,
                fontWeight: "700",
              }}
            >
              {range}
            </Typography>
          </Pressable>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    marginBottom: 20,
  },

  title: {
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  chip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
});