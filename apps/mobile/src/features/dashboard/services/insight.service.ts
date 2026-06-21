export function generateInsight(
    totals,
    categories,
    profile,
) {

    if (totals.expense === 0)
        return "Add your first expense to receive personalized insights.";

    if (
        profile?.monthly_budget &&
        totals.expense >
        profile.monthly_budget
    ) {
        return `You've exceeded your monthly budget by ₹${(
            totals.expense -
            profile.monthly_budget
        ).toLocaleString()}.`;
    }

    if (categories.length) {
        return `${categories[0].category} accounts for ${categories[0].percentage}% of your expenses.`;
    }

    return "Great work tracking your finances!";
}