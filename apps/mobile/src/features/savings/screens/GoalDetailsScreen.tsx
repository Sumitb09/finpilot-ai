import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  router,
  useLocalSearchParams,
} from "expo-router";

import Screen from "../../../components/ui/Screen";
import Button from "../../../components/ui/Button";
import Typography from "../../../components/ui/Typography";

import {
    GoalProgress,
    ContributionItem,
    AddContributionSheet,
    GoalPlannerCard,
  } from "../components";

  import {
    useGoal,
    useContributions,
    useDeleteGoal,
    useGoalPlanner,
  } from "../hooks";



import { useProfile } from "../../settings/hooks/useProfile";

import {
  getGoalProgress,
  getRemainingAmount,
} from "../utils/goal.utils";

import { formatCurrency } from "../../../utils/currency";

import {
  useBottomSheet,
} from "../../../components/ui/bottom-sheet";

export default function GoalDetailsScreen() {
  const { id } =
    useLocalSearchParams();

  const { present, dismiss } =
    useBottomSheet();

  const {
    data: goal,
    isPending,
  } = useGoal(id as string);

  const {
    data: contributions = [],
  } = useContributions(id as string);

  const deleteGoal =
    useDeleteGoal();

  const { data: profile } =
    useProfile();

  const plan =
    useGoalPlanner(goal);

  if (isPending) {
    return <Screen />;
  }

  if (!goal) {
    return (
      <Screen>
        <Typography>
          Goal not found.
        </Typography>
      </Screen>
    );
  }

  const progress =
    getGoalProgress(
      goal.saved_amount,
      goal.target_amount
    );

  function handleDelete() {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteGoal.mutateAsync(
                goal.id
              );

              router.back();
            } catch (error: any) {
              Alert.alert(
                "Error",
                error.message
              );
            }
          },
        },
      ]
    );
  }

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <Typography variant="h1">
          {goal.emoji} {goal.title}
        </Typography>

        <Typography
          style={styles.amount}
        >
          {formatCurrency(
            goal.saved_amount,
            profile?.currency ??
              "INR"
          )}

          {" / "}

          {formatCurrency(
            goal.target_amount,
            profile?.currency ??
              "INR"
          )}
        </Typography>

        <GoalProgress
          progress={progress}
        />

        <View style={styles.stats}>
          <View>
            <Typography>
              Progress
            </Typography>

            <Typography variant="h3">
              {progress.toFixed(1)}%
            </Typography>
          </View>

          <View>
            <Typography>
              Remaining
            </Typography>

            <Typography variant="h3">
              {formatCurrency(
                getRemainingAmount(
                  goal.saved_amount,
                  goal.target_amount
                ),
                profile?.currency ??
                  "INR"
              )}
            </Typography>
          </View>
        </View>

        {plan && (
          <GoalPlannerCard
            plan={plan}
            currency={
              profile?.currency ??
              "INR"
            }
          />
        )}

        {!!goal.target_date && (
          <Typography
            style={styles.targetDate}
          >
            🎯 Target Date{" "}
            {new Date(
              goal.target_date
            ).toLocaleDateString()}
          </Typography>
        )}

        <Button
          title="💰 Add Money"
          onPress={() =>
            present(
              <AddContributionSheet
                goal={goal}
                onSuccess={() => {
                  dismiss();
                }}
              />
            )
          }
        />

        <View style={styles.space} />

        <Button
          title="✏️ Edit Goal"
          onPress={() =>
            router.push(
              `/(protected)/edit-goal/${goal.id}`
            )
          }
        />

        <View style={styles.space} />

        <Button
          title="🗑 Delete Goal"
          onPress={
            handleDelete
          }
        />

        <Typography
          variant="h2"
          style={styles.sectionTitle}
        >
          Contributions
        </Typography>

        {contributions.length ===
        0 ? (
          <Typography>
            No contributions yet.
          </Typography>
        ) : (
          contributions.map(
            (item) => (
              <ContributionItem
                key={item.id}
                amount={
                  item.amount
                }
                note={
                  item.note
                }
                date={
                  item.created_at
                }
                currency={
                  profile?.currency ??
                  "INR"
                }
              />
            )
          )
        )}
      </ScrollView>
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    container: {
      paddingBottom: 120,
    },

    amount: {
      fontSize: 24,
      fontWeight: "700",
      marginTop: 20,
      marginBottom: 20,
    },

    stats: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginVertical: 24,
    },

    targetDate: {
      marginVertical: 20,
    },

    sectionTitle: {
      marginTop: 32,
      marginBottom: 16,
    },

    space: {
      height: 12,
    },
  });