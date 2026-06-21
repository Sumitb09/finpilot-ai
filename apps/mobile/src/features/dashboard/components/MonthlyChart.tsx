import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

import Card from "../../../components/ui/Card";
import { useAppTheme } from "../../../theme/useAppTheme";

import { MonthlyData } from "../services/analytics.service";

const width = Dimensions.get("window").width - 60;

type Props = {
  values?: MonthlyData[];
};

export default function MonthlyChart({
  values = [],
}: Props) {
  const { palette } = useAppTheme();

  const labels =
    values.length > 0
      ? values.map((item) => item.month)
      : ["Jan"];

  const chartData =
    values.length > 0
      ? values.map((item) => item.expense)
      : [0];

  return (
    <Card>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: chartData,
              strokeWidth: 3,
            },
          ],
        }}
        width={width}
        height={220}
        bezier
        fromZero
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines
        chartConfig={{
          backgroundGradientFrom: palette.card,
          backgroundGradientTo: palette.card,
          decimalPlaces: 0,

          color: () => palette.primary,

          labelColor: () => palette.subtext,

          propsDots: {
            r: "5",
            strokeWidth: "2",
            stroke: palette.primary,
          },

          propsBackgroundLines: {
            stroke: palette.border,
          },
        }}
        style={{
          borderRadius: 18,
        }}
      />
    </Card>
  );
}