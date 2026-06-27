import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import Markdown from "react-native-markdown-display";

import Screen from "../../../components/ui/Screen";
import Typography from "../../../components/ui/Typography";
import Button from "../../../components/ui/Button";

import { useDashboard } from "../../dashboard/hooks/useDashboard";
import { useReport } from "../hooks/useReport";
import { exportReportAsPDF } from "../services/pdf.service";

import { useAppTheme } from "../../../theme/useAppTheme";

export default function ReportScreen() {
  const { palette } = useAppTheme();

  const {
    transactions = [],
    profile,
  } = useDashboard();

  const {
    loading,
    report,
    generate,
  } = useReport();

  useEffect(() => {
    generate(
      transactions,
      profile?.monthly_budget ?? 0,
      profile?.currency ?? "INR"
    );
  }, [transactions, profile]);

  return (
    <Screen>
      <Typography
        variant="h2"
        style={styles.title}
      >
        📄 Monthly Financial Report
      </Typography>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={palette.primary}
        />
      ) : (
        <>
          <ScrollView
            style={styles.report}
            showsVerticalScrollIndicator={false}
          >
            <Markdown
              style={{
                body: {
                  color: palette.text,
                  fontSize: 16,
                  lineHeight: 24,
                },
                heading1: {
                  color: palette.primary,
                  fontSize: 26,
                  marginBottom: 12,
                },
                heading2: {
                  color: palette.primary,
                  fontSize: 20,
                  marginTop: 18,
                  marginBottom: 10,
                },
                bullet_list: {
                  color: palette.text,
                },
              }}
            >
              {report}
            </Markdown>
          </ScrollView>

          <Button
            title="🔄 Regenerate Report"
            onPress={() =>
              generate(
                transactions,
                profile?.monthly_budget ?? 0,
                profile?.currency ?? "INR"
              )
            }
          />

          <Button
            title="📄 Export PDF"
            onPress={() => exportReportAsPDF(report)}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },

  report: {
    flex: 1,
    marginBottom: 20,
  },
});