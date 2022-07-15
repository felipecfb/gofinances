import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { DataListProps } from "../Dashboard";

import * as S from "./styles";

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  async function loadData() {
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: DataListProps) => expensive.transactionType === "outcome"
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: DataListProps) => {
        if (expensive.category === category.key) {
          categorySum += parseFloat(expensive.amount);
        }
      });

      if (categorySum > 0) {
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          color: category.color,
        });
      }
    });

    setTotalByCategories(totalByCategory);

    const incomes = responseFormatted.filter(
      (income: DataListProps) => income.transactionType === "income"
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>
      <S.Content>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.total}
            color={item.color}
          />
        ))}
      </S.Content>
    </S.Container>
  );
}
