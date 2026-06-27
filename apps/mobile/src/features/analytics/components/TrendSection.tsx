import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
} from "react-native";

import {
  LineChart,
} from "react-native-chart-kit";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";

const width =
  Dimensions.get("window").width - 40;

type Props = {
  title: string;
  values: number[];
  labels: string[];
};

export default function TrendSection({
  title,
  values,
  labels,
}: Props) {
  const { palette } =
    useAppTheme();

  const safeValues =
    values.length > 0
      ? values
      : [0];

  const safeLabels =
    labels.length > 0
      ? labels
      : [""];

  return (
    <Card style={styles.card}>
      <Typography
        variant="h3"
        style={styles.title}
      >
        {title}
      </Typography>

      <LineChart
        data={{
          labels: safeLabels,
          datasets: [
            {
              data: safeValues,
            },
          ],
        }}
        width={width}
        height={220}
        bezier
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        chartConfig={{
          backgroundGradientFrom:
            palette.card,
          backgroundGradientTo:
            palette.card,
          decimalPlaces: 0,

          color: (opacity = 1) =>
            `rgba(37,99,235,${opacity})`,

          labelColor: () =>
            palette.subtext,

          propsForDots: {
            r: "4",
          },
        }}
        style={styles.chart}
      />
    </Card>
  );
}

const styles =
  StyleSheet.create({
    card: {
      marginBottom: 20,
    },

    title: {
      marginBottom: 14,
    },

    chart: {
      borderRadius: 16,
    },
  });