import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const InputComponent = ({
  placeholder,
  value,
  changeText,
  type,
  typeInput,
  changeTypeInput,
}) => {
  return (
    <Box style={styles.boxInput}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#1E1E1E"
        value={value}
        onChangeText={(value) => changeText(value)}
        keyboardType={type == "pass" ? "default" : "email-address"}
        secureTextEntry={typeInput ? typeInput : false}
      />
      {type == "pass" ? (
        <TouchableOpacity
          style={styles.btnChangeSecureText}
          onPress={() => changeTypeInput(typeInput ? false : true)}
        >
          <Ionicons
            name={typeInput ? "eye-off" : "eye"}
            size={30}
            color="#7E74F1"
          />
        </TouchableOpacity>
      ) : null}
    </Box>
  );
};

const styles = StyleSheet.create({
  boxInput: {
    position: "relative",
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    fontSize: 16,
    padding: 15,
    marginVertical: 10,
    height: 52,
    width: 332,
  },
  btnChangeSecureText: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default InputComponent;
