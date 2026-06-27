import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  icon: string;
  title: string;
  amount: number;
  income: boolean;
  category: string;
  date: string;
};

export default function TransactionHero({
  icon,
  title,
  amount,
  income,
  category,
  date,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <Card style={styles.card}>
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: palette.primary + "20",
          },
        ]}
      >
        <Typography style={styles.icon}>
          {icon}
        </Typography>
      </View>

      <Typography
        variant="h2"
        style={styles.title}
      >
        {title}
      </Typography>

      <Typography
        style={{
          color: palette.subtext,
        }}
      >
        {category}
      </Typography>

      <Typography
        style={[
          styles.amount,
          {
            color: income
              ? palette.success
              : palette.danger,
          },
        ]}
      >
        {income ? "+" : "-"}₹
        {amount.toFixed(2)}
      </Typography>

      <Typography
        style={{
          color: palette.subtext,
        }}
      >
        {date}
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    paddingVertical: 28,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  icon: {
    fontSize: 42,
  },

  title: {
    marginBottom: 6,
    textAlign: "center",
  },

  amount: {
    fontSize: 34,
    fontWeight: "800",
    marginVertical: 14,
  },
});