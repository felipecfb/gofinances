import React, { useState } from "react";
import { Modal } from "react-native";

import { useForm } from "react-hook-form";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import * as S from "./styles";
import { InputForm } from "../../components/Forms/InputForm";

interface FormData {
  name: string;
  amount: number;
}

export function Register() {
  const [transactionType, settransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { control, handleSubmit } = useForm();

  function handleTransactionTypeSelect(type: "income" | "outcome") {
    settransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: Partial<FormData>) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }

    console.log(data);

  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <InputForm name="name" control={control} placeholder="Nome" />
          <InputForm name="amount" control={control} placeholder="Preço" />

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

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </S.Fields>

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
      </S.Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </S.Container>
  );
}
