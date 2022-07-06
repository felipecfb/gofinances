import React from "react";

import * as S from "./styles";

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: "income" | "outcome";
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface props {
  data: Data;
}

export default function TransactionCard({ data }: props) {
  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      <S.Amount type={data.type}>
        {data.type === "outcome" && "- "} {data.amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={data.category.icon} />
          <S.CategoryName>{data.category.name}</S.CategoryName>
        </S.Category>

        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}
