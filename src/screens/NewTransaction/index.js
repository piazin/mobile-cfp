import React, { useState } from "react";
import {
  View,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import { Text, Button } from "native-base";
import BottomSheet from "react-native-easy-bottomsheet";

import styles from "./styles";

import { FocusAwareStatusBar } from "../../components/FocusAwareStatusBar";
import { Header } from "../../components/NewTransactionScreen/Header";
import { InputValue } from "../../components/NewTransactionScreen/InputValue";
import { Input } from "../../components/NewTransactionScreen/Input";

const currentHeight = StatusBar.currentHeight + 10 || 16;

export default function NewTransactionScreen({ route }) {
  const { typeTransaction } = route.params;

  const [isVisible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("Select category");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const data = [
    {
      id: 1,
      name: "Carro",
    },
    {
      id: 2,
      name: "Eletronicos",
    },
    {
      id: 3,
      name: "Outros",
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { paddingTop: currentHeight }]}>
        <Header typeTransaction={typeTransaction} />
        <SafeAreaView style={styles.containerInputs}>
          <InputValue typeTransaction={typeTransaction} />

          <Input
            iconName="file-document-edit-outline"
            placeholder="Descrição"
            typeDate={false}
          />

          <Input
            iconName="calendar"
            placeholder="Data"
            typeInput="date"
            date={date}
            onChangeDate={onChangeDate}
          />

          <BottomSheet
            bottomSheetTitle="Categoria"
            bottomSheetIconColor="#7E74F1"
            bottomSheetStyle={{
              backgroundColor: "#1e1e1e",
              maxHeight: "80%",
              minHeight: "25%",
            }}
            bottomSheetTitleStyle={{ color: "#7E74F1" }}
            onRequestClose={() => setVisible(!isVisible)}
            bottomSheetVisible={isVisible}
          >
            <ScrollView>
              {data.map((item) => (
                <TouchableOpacity
                  onPress={() => {
                    setCategory(item);
                  }}
                  key={item.id}
                >
                  <Text
                    color="#fff"
                    fontWeight="medium"
                    fontFamily="body"
                    fontSize="2xl"
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </BottomSheet>

          <Input typeInput="select" iconName="bookmark-outline" />
          <Button onPress={() => setVisible(true)}>title</Button>
        </SafeAreaView>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor="#1e1e1e"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
