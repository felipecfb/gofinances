import React from "react";

import HighlightCard from "../../components/HightlightCard";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";

import * as S from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "income",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "outcome",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: { name: "Alimentação", icon: "coffee" },
      date: "10/04/2020",
    },
    {
      id: "3",
      type: "outcome",
      title: "Aluguel do Apartamento",
      amount: "R$ 1.200,00",
      category: { name: "Casa", icon: "shopping-bag" },
      date: "27/04/2020",
    },
    {
      id: "4",
      type: "outcome",
      title: "Fatura de Luz",
      amount: "R$ 250,00",
      category: { name: "Casa", icon: "shopping-bag" },
      date: "09/07/2020",
    },
  ];

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

          <S.LogoutButton onPress={() => {}}>
            <S.Icon name="power" />
          </S.LogoutButton>
        </S.UserWrapper>
      </S.Header>

      <S.HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 03 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </S.HighlightCards>

      <S.Transactions>
        <S.Title>Listagem</S.Title>

        <S.TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </S.Transactions>
    </S.Container>
  );
}
