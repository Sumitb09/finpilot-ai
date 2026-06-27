import React from "react";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";
import { formatCurrency } from "../../../utils/currency";

type Props = {
  balance: number;
  currency: string;
  change: number | null;
};

export default function BalanceCard({
  balance,
  currency,
  change,
}: Props) {
  const { t } = useTranslation();
  const { palette } = useAppTheme();

  const isPositive =
    change === null || change >= 0;

  return (
    <Card style={styles.card}>
      <Typography
        style={{
          color: palette.subtext,
        }}
      >
        {t("dashboard.totalBalance")}
      </Typography>

      <Typography
        variant="h1"
        style={[
          styles.balance,
          {
            color: palette.text,
          },
        ]}
      >
        {formatCurrency(balance, currency)}
      </Typography>

      <Typography
        style={[
          styles.change,
          {
            color: isPositive
              ? palette.success
              : palette.danger,
          },
        ]}
      >
        {change === null
          ? t("dashboard.firstMonth")
          : `${isPositive ? "▲" : "▼"} ${Math.abs(
              change
            ).toFixed(1)}% ${t(
              "dashboard.thisMonth"
            )}`}
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
  },

  balance: {
    marginTop: 10,
  },

  change: {
    marginTop: 12,
    fontWeight: "600",
  },
});