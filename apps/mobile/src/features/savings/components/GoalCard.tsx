import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { router } from "expo-router";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

import { formatCurrency } from "../../../utils/currency";
import { useAppTheme } from "../../../theme/useAppTheme";

import GoalProgress from "./GoalProgress";

import {
  SavingsGoal,
} from "../types/goal";

import {
  getGoalProgress,
  getRemainingAmount,
} from "../utils/goal.utils";

type Props = {
  goal: SavingsGoal;
  currency: string;
};

export default function GoalCard({
  goal,
  currency,
}: Props) {
  const { palette } =
    useAppTheme();

  const progress =
    getGoalProgress(
      goal.saved_amount,
      goal.target_amount
    );

  return (
    <Card style={styles.card}
      onPress={() =>
      router.push(`/(protected)/goal/${goal.id}`)}>
      <View style={styles.header}>
        <Typography
          variant="h2"
        >
          {goal.emoji}
        </Typography>

        <Typography
          variant="h3"
          style={{
            flex: 1,
            marginLeft: 12,
          }}
        >
          {goal.title}
        </Typography>

        <Typography
          style={{
            color:
              palette.primary,
            fontWeight: "700",
          }}
        >
          {progress.toFixed(0)}%
        </Typography>
      </View>

      <GoalProgress
        progress={progress}
      />

      <Typography
        style={{
          marginTop: 12,
        }}
      >
        {formatCurrency(
          goal.saved_amount,
          currency
        )}
        {" / "}
        {formatCurrency(
          goal.target_amount,
          currency
        )}
      </Typography>

      <Typography
        style={{
          color:
            palette.subtext,
          marginTop: 6,
        }}
      >
        Remaining{" "}
        {formatCurrency(
          getRemainingAmount(
            goal.saved_amount,
            goal.target_amount
          ),
          currency
        )}
      </Typography>
    </Card>
  );
}

const styles =
  StyleSheet.create({
    card: {
      marginBottom: 18,
      padding: 20,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
    },
  });