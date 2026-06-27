import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

export default function TransactionDatePicker({
  value,
  onChange,
}: Props) {
  const { palette } = useAppTheme();

  const [open, setOpen] =
    useState(false);

  function handleChange(
    _: any,
    selected?: Date
  ) {
    setOpen(false);

    if (selected) {
      onChange(selected);
    }
  }

  const label =
    value.toDateString() ===
    new Date().toDateString()
      ? "Today"
      : value.toLocaleDateString(
          undefined,
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        );

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.button,
          {
            backgroundColor:
              palette.card,
            borderColor:
              palette.border,
          },
        ]}
      >
        <Text
          style={[
            styles.icon,
            {
              color:
                palette.primary,
            },
          ]}
        >
          📅
        </Text>

        <Text
          style={[
            styles.text,
            {
              color:
                palette.text,
            },
          ]}
        >
          {label}
        </Text>
      </Pressable>

      {open && (
        <DateTimePicker
          value={value}
          mode="date"
          display={
            Platform.OS === "ios"
              ? "inline"
              : "default"
          }
          maximumDate={new Date()}
          onChange={handleChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: 18,
    marginRight: 8,
  },

  text: {
    fontSize: 15,
    fontWeight: "600",
  },
});