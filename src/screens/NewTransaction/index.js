import React, { useState } from "react";
import {
  View,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text } from "native-base";

import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FocusAwareStatusBar } from "../../components/FocusAwareStatusBar";
import { Header } from "../../components/NewTransactionScreen/Header";

import { validateValue } from "../../utils/validateFormFieldsUser";

const currentHeight = StatusBar.currentHeight + 10 || 16;

export default function NewTransactionScreen({ route }) {
  const { typeTransaction } = route.params;
  const [valueTransaction, setValueTransaction] = useState(0);

  const onChangeValueTransaction = (value) => {
    value = value + "";
    value = parseInt(value.replace(/[\D]+/g, ""));
    value = value + "";
    value = value.replace(/([0-9]{2})$/g, ",$1");

    if (value.length > 6) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    if (value == "NaN") return setValueTransaction(0);

    setValueTransaction(value);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { paddingTop: currentHeight }]}>
        <Header typeTransaction={typeTransaction} />
        <SafeAreaView style={styles.containerInputs}>
          <TextInput
            style={styles.inputValue}
            value={String(valueTransaction)}
            defaultValue={0}
            returnKeyType="next"
            keyboardType="decimal-pad"
            placeholderTextColor="#fff"
            onChangeText={onChangeValueTransaction}
            maxLength={10}
          />
        </SafeAreaView>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor="#1e1e1e"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
