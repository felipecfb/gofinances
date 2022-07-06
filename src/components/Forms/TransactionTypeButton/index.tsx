import React from "react";
import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

interface Props extends TouchableOpacityProps {
  title: string;
  type: "income" | "outcome";
  isActive: boolean;
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: Props) {
  return (
    <S.Container {...rest} isActive={isActive} type={type}>
      <S.Icon name={icons[type]} type={type} />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
