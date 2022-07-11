import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import * as S from "./styles";

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

interface Props extends RectButtonProps {
  title: string;
  type: "income" | "outcome";
  isActive: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <S.Container isActive={isActive} type={type}>
      <S.Button {...rest}>
        <S.Icon name={icons[type]} type={type} />
        <S.Title>{title}</S.Title>
      </S.Button>
    </S.Container>
  );
}
