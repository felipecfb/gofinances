import React from "react";
import { categories } from "../../utils/categories";

import * as S from "./styles";

export interface TransactionCardProps {
  transactionType: "income" | "outcome";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export default function TransactionCard({ data }: Props) {
  const [ category ] = categories.filter(
    item => item.key === data.category
  );

  return (
    <S.Container>
      <S.Title>{data.name}</S.Title>
      <S.Amount type={data.transactionType}>
        {data.transactionType === "outcome" && "- "} {data.amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>

        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}
