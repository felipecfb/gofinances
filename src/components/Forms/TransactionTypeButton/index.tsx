import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import * as S from "./styles";

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

interface Props extends RectButtonProps {
  title: string;
  transactionType: "income" | "outcome";
  isActive: boolean;
}

export function TransactionTypeButton({
  title,
  transactionType,
  isActive,
  ...rest
}: Props) {
  return (
    <S.Container isActive={isActive} transactionType={transactionType}>
      <S.Button {...rest}>
        <S.Icon name={icons[transactionType]} transactionType={transactionType} />
        <S.Title>{title}</S.Title>
      </S.Button>
    </S.Container>
  );
}
