import React from "react";
import { Alert } from "react-native";

import ContributionForm from "./ContributionForm";

import { useAddContribution } from "../hooks/useAddContribution";

import { SavingsGoal } from "../types/goal";

import {
  saveContribution,
  updateGoal,
} from "../services/savings.service";

type Props = {
  goal: SavingsGoal;
  onSuccess(): void;
};

export default function AddContributionSheet({
  goal,
  onSuccess,
}: Props) {
  const mutation =
    useAddContribution();

  async function handleSubmit(
    amount: number,
    note: string
  ) {
    try {
      await saveContribution({
        goal_id: goal.id,
        amount,
        note,
      });

      await updateGoal(goal.id, {
        saved_amount:
          Number(goal.saved_amount) +
          amount,
      });

      onSuccess();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message
      );
    }
  }

  return (
    <ContributionForm
      loading={
        mutation.isPending
      }
      onSubmit={
        handleSubmit
      }
    />
  );
}