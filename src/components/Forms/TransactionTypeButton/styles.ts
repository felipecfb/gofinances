import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export interface IconProps {
  type: "income" | "outcome";
  isActive: boolean;
}

interface ContainerProps {
  isActive: boolean;
  type: "income" | "outcome";
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type }) => isActive && type === 'income' && css`
    background-color: ${({ theme }) => theme.colors.sucess_light};
  `}

  ${({ isActive, type }) => isActive && type === 'outcome' && css`
    background-color: ${({ theme }) => theme.colors.attention_light};
  `}
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === "income" ? theme.colors.sucess : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
