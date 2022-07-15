import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect } from "react";

import HighlightCard from "../../components/HightlightCard";
import * as S from "./styles";

import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = React.useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          transactionType: item.transactionType,
          category: item.category,
          date,
        }
      }
    );

    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

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

          <S.LogoutButton>
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
