import React, {
    useState,
  } from "react";
  
  import {
    Alert,
    StyleSheet,
    TextInput,
  } from "react-native";
  
  import { router } from "expo-router";
  
  import Screen from "../../../components/ui/Screen";
  import Button from "../../../components/ui/Button";
  import Typography from "../../../components/ui/Typography";
  
  import { useCreateGoal } from "../hooks/useCreateGoal";
  
  import { useAppTheme } from "../../../theme/useAppTheme";
  
  export default function AddGoalScreen() {
    const { palette } =
      useAppTheme();
  
    const createGoal =
      useCreateGoal();
  
    const [title, setTitle] =
      useState("");
  
    const [emoji, setEmoji] =
      useState("🎯");
  
    const [amount, setAmount] =
      useState("");
  
    const [targetDate, setTargetDate] =
      useState("");
  
    const [notes, setNotes] =
      useState("");
  
    async function handleSave() {
      if (!title.trim()) {
        Alert.alert(
          "Validation",
          "Goal title is required."
        );
        return;
      }
  
      if (
        !amount ||
        Number(amount) <= 0
      ) {
        Alert.alert(
          "Validation",
          "Enter a valid amount."
        );
        return;
      }
  
      try {
        await createGoal.mutateAsync({
          title,
          emoji,
          target_amount:
            Number(amount),
          target_date:
            targetDate || undefined,
          color: "#3B82F6",
          notes,
        });
  
        router.back();
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.message
        );
      }
    }
  
    return (
      <Screen>
        <Typography
          variant="h1"
          style={{
            marginBottom: 24,
          }}
        >
          Create Goal
        </Typography>
  
        <TextInput
          value={emoji}
          onChangeText={setEmoji}
          style={[
            styles.input,
            {
              backgroundColor:
                palette.card,
              color: palette.text,
            },
          ]}
          placeholder="🎯"
        />
  
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Goal Title"
          style={[
            styles.input,
            {
              backgroundColor:
                palette.card,
              color: palette.text,
            },
          ]}
        />
  
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Target Amount"
          style={[
            styles.input,
            {
              backgroundColor:
                palette.card,
              color: palette.text,
            },
          ]}
        />
  
        <TextInput
          value={targetDate}
          onChangeText={
            setTargetDate
          }
          placeholder="YYYY-MM-DD"
          style={[
            styles.input,
            {
              backgroundColor:
                palette.card,
              color: palette.text,
            },
          ]}
        />
  
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Notes (optional)"
          multiline
          style={[
            styles.input,
            {
              backgroundColor:
                palette.card,
              color: palette.text,
              height: 100,
            },
          ]}
        />
  
        <Button
          title="Create Goal"
          onPress={handleSave}
          loading={
            createGoal.isPending
          }
        />
      </Screen>
    );
  }
  
  const styles =
    StyleSheet.create({
      input: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 18,
        fontSize: 16,
      },
    });