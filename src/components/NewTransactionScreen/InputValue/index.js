import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Text } from "native-base";

export function InputValue({
  typeTransaction,
  valueTransaction,
  setValueTransaction,
}) {
  const onChangeValueTransaction = (value) => {
    value = value + "";
    value = parseInt(value.replace(/[\D]+/g, ""));
    value = value + "";
    value = value.replace(/([0-9]{2})$/g, ",$1");

    if (value.length > 6) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    if (value == "NaN") return setValueTransaction("");

    setValueTransaction(value);
  };

  return (
    <>
      <Text
        color="white"
        fontFamily="body"
        fontSize="md"
        fontWeight="normal"
        marginBottom="2"
      >
        Valor da {typeTransaction == "expense" ? "despesa" : "receita"}
      </Text>
      <View style={styles.boxInputValue}>
        <Text color="#ccc" fontFamily="body" fontSize={22} fontWeight="medium">
          R$
        </Text>
        <TextInput
          style={styles.inputValue}
          value={String(valueTransaction)}
          defaultValue={0}
          returnKeyType="next"
          keyboardType="decimal-pad"
          placeholderTextColor="#ccc"
          onChangeText={onChangeValueTransaction}
          maxLength={10}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  boxInputValue: {
    borderBottomColor: "#ccc",
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 6,
    height: 50,
    textAlign: "center",
    width: "65%",
  },
  inputValue: {
    color: "#ccc",
    fontSize: 32,
    marginLeft: 10,
    minWidth: 80,
    textAlign: "center",
  },
});
