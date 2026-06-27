import React, {
    useEffect,
    useState,
  } from "react";
  
  import {
    Alert,
    StyleSheet,
    TextInput,
  } from "react-native";
  
  import {
    router,
    useLocalSearchParams,
  } from "expo-router";
  
  import Screen from "../../../components/ui/Screen";
  import Button from "../../../components/ui/Button";
  import Typography from "../../../components/ui/Typography";
  
  import { useGoal } from "../hooks/useGoal";
  import { useUpdateGoal } from "../hooks/useUpdateGoal";
  
  import { useAppTheme } from "../../../theme/useAppTheme";
  
  export default function EditGoalScreen() {
    const { palette } = useAppTheme();
  
    const { id } = useLocalSearchParams();
  
    const { data: goal } =
      useGoal(id as string);
  
    const updateGoal =
      useUpdateGoal();
  
    const [title, setTitle] =
      useState("");
  
    const [emoji, setEmoji] =
      useState("");
  
    const [amount, setAmount] =
      useState("");
  
    const [date, setDate] =
      useState("");
  
    const [notes, setNotes] =
      useState("");
  
    useEffect(() => {
      if (!goal) return;
  
      setTitle(goal.title);
      setEmoji(goal.emoji);
      setAmount(
        String(goal.target_amount)
      );
      setDate(
        goal.target_date ?? ""
      );
      setNotes(
        goal.notes ?? ""
      );
    }, [goal]);
  
    async function handleSave() {
      try {
        await updateGoal.mutateAsync({
          id: id as string,
  
          payload: {
            title,
            emoji,
            target_amount:
              Number(amount),
            target_date:
              date || undefined,
            notes,
          },
        });
  
        router.back();
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.message
        );
      }
    }
  
    if (!goal) {
      return <Screen />;
    }
  
    return (
      <Screen>
        <Typography
          variant="h1"
          style={{
            marginBottom: 24,
          }}
        >
          Edit Goal
        </Typography>
  
        <TextInput
          value={emoji}
          onChangeText={setEmoji}
          style={[
            styles.input,
            {
              backgroundColor:
                palette.card,
              color:
                palette.text,
            },
          ]}
        />
  
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={[
            styles.input,
            {
              backgroundColor:
                palette.card,
              color:
                palette.text,
            },
          ]}
        />
  
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={[
            styles.input,
            {
              backgroundColor:
                palette.card,
              color:
                palette.text,
            },
          ]}
        />
  
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          style={[
            styles.input,
            {
              backgroundColor:
                palette.card,
              color:
                palette.text,
            },
          ]}
        />
  
        <TextInput
          value={notes}
          onChangeText={setNotes}
          multiline
          style={[
            styles.input,
            {
              backgroundColor:
                palette.card,
              color:
                palette.text,
              height: 100,
            },
          ]}
        />
  
        <Button
          title="Save Changes"
          loading={
            updateGoal.isPending
          }
          onPress={handleSave}
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
      },
    });