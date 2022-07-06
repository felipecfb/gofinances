import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

import * as S from "./styles";

export function Register() {
  const [transactionType, settransactionType] = useState("");

  function handleTransactionTypeSelect(type: "income" | "outcome") {
    settransactionType(type);
  }
  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <S.TransactionTypes>
            <TransactionTypeButton
              title="Income"
              type="income"
              onPress={() => handleTransactionTypeSelect("income")}
              isActive={transactionType === "income"}
            />
            <TransactionTypeButton
              title="Outcome"
              type="outcome"
              onPress={() => handleTransactionTypeSelect("outcome")}
              isActive={transactionType === "outcome"}
            />
          </S.TransactionTypes>
        </S.Fields>

        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  );
}
