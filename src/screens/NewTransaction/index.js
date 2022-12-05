import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Text } from "native-base";
import { RadioButton } from "react-native-paper";

import { TransactionsClass } from "../../services/api";
import { AuthContext } from "../../contexts/authContext";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import { FocusAwareStatusBar } from "../../components/FocusAwareStatusBar";
import { Header } from "../../components/NewTransactionScreen/Header";
import { InputValue } from "../../components/NewTransactionScreen/InputValue";
import { Input } from "../../components/NewTransactionScreen/Input";
import { Button } from "../../components/NewTransactionScreen/Button";

const currentHeight = StatusBar.currentHeight + 10 || 16;

const transaction = new TransactionsClass();

export default function NewTransactionScreen({ route }) {
  const navigation = useNavigation();

  const { user, jwt } = useContext(AuthContext);
  const { typeTransaction } = route.params;

  const [categoryModalIsVisible, setCategoryModalIsVisible] = useState(false);

  const [valueTransaction, setValueTransaction] = useState("0");
  const [valueTransactionFormat, setValueTransactionFormat] =
    useState(valueTransaction);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(typeTransaction);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  useEffect(() => {
    setType(typeTransaction);
  }, [typeTransaction]);

  useEffect(() => {
    formatValue();
  }, [valueTransaction]);

  const formatValue = () => {
    let formatValue;
    formatValue = valueTransaction.replace(".", "");
    formatValue = formatValue.replace(",", ".");

    if (formatValue.length == 3) formatValue = `0${formatValue}`;
    setValueTransactionFormat(formatValue);
  };

  const onSubmitTransaction = async () => {
    await transaction.createTransaction(
      valueTransactionFormat,
      date,
      type,
      description,
      category?._id,
      user._id,
      jwt
    );
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={[styles.container, { paddingTop: currentHeight }]}>
        <Header typeTransaction={type} />
        <SafeAreaView style={styles.containerInputs}>
          <InputValue
            typeTransaction={type}
            valueTransaction={valueTransaction}
            setValueTransaction={setValueTransaction}
          />

          <Input
            iconName="file-document-edit-outline"
            placeholder="Descrição"
            typeDate="desc"
            setDescription={setDescription}
            description={description}
          />

          <Input
            iconName="calendar"
            placeholder="Data"
            typeInput="date"
            date={date}
            onChangeDate={onChangeDate}
          />

          <Input
            typeInput="select"
            iconName="bookmark-outline"
            categoryModalIsVisible={categoryModalIsVisible}
            setCategoryModalIsVisible={setCategoryModalIsVisible}
            category={category}
            setCategory={setCategory}
          />

          <View style={styles.boxRadioButtons}>
            <RadioButton
              value="expense"
              label="Despesa"
              status={type === "expense" ? "checked" : "unchecked"}
              onPress={() => setType("expense")}
            />
            <Text
              color="white"
              fontWeight="medium"
              fontFamily="body"
              fontSize={16}
              marginRight={6}
            >
              Despesa
            </Text>

            <RadioButton
              value="income"
              label="Receita"
              status={type === "income" ? "checked" : "unchecked"}
              onPress={() => setType("income")}
            />
            <Text
              color="white"
              fontWeight="medium"
              fontFamily="body"
              fontSize={16}
              marginRight={6}
            >
              Receita
            </Text>
          </View>

          <Button title="Salvar" onPress={onSubmitTransaction} />
        </SafeAreaView>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor="#1e1e1e"
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
