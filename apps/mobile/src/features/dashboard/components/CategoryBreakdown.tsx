import React from "react";

import Card from "../../../components/common/Card";

import CategoryBar from "./CategoryBar";

import { CategorySummary } from "../services/dashboard.service";

type Props = {
  categories: CategorySummary[];
  currency: string;
};

export default function CategoryBreakdown({
  categories,
  currency,
}: Props) {
  return (
    <Card>
      {categories.map((category) => (
        <CategoryBar
          key={category.category}
          icon={category.icon}
          name={category.category}
          amount={category.total}
          percentage={category.percentage}
          currency={currency}
        />
      ))}
    </Card>
  );
}