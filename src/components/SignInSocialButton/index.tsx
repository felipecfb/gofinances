import React from "react";
import * as S from "./styles";

import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({ title, svg: Svg, ...rest }: Props) {
  return (
    <S.Button>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>

      <S.Text>
        {title}
      </S.Text>
    </S.Button>
  )
}