import React from "react";
import HighlightCard from "../../components/HightlightCard";
import * as S from "./styles";

export function Dashboard() {
  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.UserAvatar
              source={{
                uri: "https://avatars.githubusercontent.com/u/71598626?v=4",
              }}
            />
            <S.User>
              <S.UserGreeting>Olá,</S.UserGreeting>
              <S.UserName>Felipe</S.UserName>
            </S.User>
          </S.UserInfo>
          <S.Icon name="power" />
        </S.UserWrapper>
      </S.Header>

      <S.HighlightCards>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </S.HighlightCards>
    </S.Container>
  );
}
