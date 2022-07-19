import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import * as S from "./styles";
import { InputForm } from "../../components/Forms/InputForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormData {
  name: string;
  amount: string;
}

type NavigationProps = {
  navigate: (screen: string) => void;
};

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required("O nome é obrigatório"),
  amount: Yup
  .number()
  .typeError("Informe um valor")
  .positive("O valor deve ser positivo")
  .required('O valor é obrigatório'),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelect(type: "income" | "outcome") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function clearForm() {
    reset();
    setTransactionType("");
    setCategory({
      key: "category",
      name: "Categoria",
    });
    navigation.navigate("Listagem");
  }

  async function handleRegister(form: Partial<FormData>) {
    const dataKey = "@gofinance:transactions";
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      clearForm();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar.");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <S.TransactionTypes>
              <TransactionTypeButton
                title="Income"
                transactionType="income"
                onPress={() => handleTransactionTypeSelect("income")}
                isActive={transactionType === "income"}
              />
              <TransactionTypeButton
                title="Outcome"
                transactionType="outcome"
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
    </TouchableWithoutFeedback>
  );
}
