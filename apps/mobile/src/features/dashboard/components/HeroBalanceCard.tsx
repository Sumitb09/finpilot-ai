import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

import { useAppTheme } from "../../../theme/useAppTheme";

import { formatCurrency } from "../../../utils/currency";
import { useTranslation } from "react-i18next";

type Props = {
  balance: number;
  income: number;
  expense: number;
  savings: number;
  currency: string;
};

export default function HeroBalanceCard({
  balance,
  income,
  expense,
  savings,
  currency,
}: Props) {
  const { palette } = useAppTheme();
  const { t } = useTranslation();

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor:
            palette.primary,
        },
      ]}
    >
      <Typography
        style={styles.balanceLabel}
      >
        {t("dashboard.totalBalance")}
      </Typography>

      <Typography
        variant="h1"
        style={styles.balance}
      >
        {formatCurrency(
          balance,
          currency
        )}
      </Typography>

      <View style={styles.stats}>
        <View style={styles.item}>
          <Typography
            style={styles.label}
          >
            {t("transactions.income")}
          </Typography>

          <Typography
            style={styles.value}
          >
            {formatCurrency(
              income,
              currency
            )}
          </Typography>
        </View>

        <View style={styles.item}>
          <Typography
            style={styles.label}
          >
            {t("transactions.expense")}
          </Typography>

          <Typography
            style={styles.value}
          >
            {formatCurrency(
              expense,
              currency
            )}
          </Typography>
        </View>

        <View style={styles.item}>
          <Typography
            style={styles.label}
          >
            {t("transactions.savings")}
          </Typography>

          <Typography
            style={styles.value}
          >
            {formatCurrency(
              savings,
              currency
            )}
          </Typography>
        </View>
      </View>
    </Card>
  );
}

const styles =
  StyleSheet.create({
    card: {
      borderRadius: 28,
      padding: 28,
      marginBottom: 24,
    },

    balanceLabel: {
      color: "#E2E8F0",
      fontSize: 15,
    },

    balance: {
      color: "#FFFFFF",
      fontSize: 38,
      fontWeight: "700",
      marginVertical: 12,
    },

    stats: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginTop: 20,
    },

    item: {
      flex: 1,
    },

    label: {
      color: "#CBD5E1",
      fontSize: 13,
    },

    value: {
      color: "#FFFFFF",
      fontWeight: "700",
      marginTop: 6,
      fontSize: 16,
    },
  });