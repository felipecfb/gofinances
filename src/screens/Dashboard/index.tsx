import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import HighlightCard from "../../components/HightlightCard";
import * as S from "./styles";

import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";
import { useFocusEffect } from "@react-navigation/native";

import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface highlightProps {
  amount: string;
}

interface highlightData {
  entries: highlightProps;
  expensives: highlightProps;
  total: highlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<highlightData>(
    {} as highlightData
  );

  const theme = useTheme();

  async function loadTransactions() {
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.transactionType === "income") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          transactionType: item.transactionType,
          category: item.category,
          date,
        };
      }
    );

    setTransactions(transactionsFormatted);

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });

    setIsLoading(false);

  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  console.log(highlightData);

  return (
    <S.Container>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
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
              amount={highlightData.entries.amount}
              lastTransaction="Última entrada dia 13 de abril"
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction="Última entrada dia 03 de abril"
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction="01 à 16 de abril"
              type="total"
            />
          </S.HighlightCards>
          <S.Transactions>
            <S.Title>Listagem</S.Title>

            <S.TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
}
