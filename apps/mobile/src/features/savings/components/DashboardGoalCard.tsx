import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { router } from "expo-router";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

import GoalProgress from "./GoalProgress";

import {
  SavingsGoal,
} from "../types/goal";

import {
  getGoalProgress,
} from "../utils/goal.utils";

import { formatCurrency } from "../../../utils/currency";

type Props = {
  goal: SavingsGoal;
  currency: string;
};

export default function DashboardGoalCard({
  goal,
  currency,
}: Props) {
  const progress =
    getGoalProgress(
      goal.saved_amount,
      goal.target_amount
    );

  return (
    <Pressable
      onPress={() =>
        router.push(
          `/(protected)/goal/${goal.id}`
        )
      }
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <Typography variant="h3">
            {goal.emoji}
          </Typography>

          <Typography
            variant="h3"
            style={styles.title}
          >
            {goal.title}
          </Typography>

          <Typography>
            {progress.toFixed(0)}%
          </Typography>
        </View>

        <GoalProgress
          progress={progress}
        />

        <Typography
          style={styles.amount}
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
      </Card>
    </Pressable>
  );
}

const styles =
  StyleSheet.create({
    card: {
      marginTop: 10,
      marginBottom: 20,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
    },

    title: {
      flex: 1,
      marginLeft: 12,
    },

    amount: {
      marginTop: 12,
    },
  });