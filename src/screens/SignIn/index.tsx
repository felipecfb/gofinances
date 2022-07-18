import React, { useContext } from "react";
import * as S from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

export function SignIn() {
  const { user } = useAuth();
  console.log(user);

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <S.Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples.
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>Faça seu login com {"\n"} uma das contas abaixo</S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
}
