import React from "react";

import Card from "../../../components/ui/Card";

import CategoryBar from "./CategoryBar";

import { CategorySummary } from "../services/dashboard.service";

type Props = {
  categories: CategorySummary[];
};

export default function CategoryBreakdown({
  categories,
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
        />
      ))}
    </Card>
  );
}