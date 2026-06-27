import React from "react";
import { FlatList } from "react-native";
import { router } from "expo-router";

import Screen from "../../../components/ui/Screen";
import Button from "../../../components/ui/Button";
import Typography from "../../../components/ui/Typography";

import GoalCard from "../components/GoalCard";
import EmptyGoals from "../components/EmptyGoals";

import { useGoals } from "../hooks/useGoals";
import { useProfile } from "../../settings/hooks/useProfile";

export default function SavingsScreen() {
  const { data: goals = [], isPending } =
    useGoals();

  const { data: profile } =
    useProfile();

  if (isPending) {
    return <Screen />;
  }

  if (goals.length === 0) {
    return (
      <Screen>
        <EmptyGoals
          onPress={() =>
            router.push(
              "/(protected)/add-goal"
            )
          }
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Typography
        variant="h1"
        style={{
          marginBottom: 20,
        }}
      >
        🎯 Savings Goals
      </Typography>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GoalCard
            goal={item}
            currency={
              profile?.currency ??
              "INR"
            }
          />
        )}
      />

      <Button
        title="+ Add Goal"
        onPress={() =>
          router.push(
            "/(protected)/add-goal"
          )
        }
      />
    </Screen>
  );
}