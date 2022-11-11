import React, { useState, useContext } from "react";
import {
  Keyboard,
  StatusBar,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { useNavigation } from "@react-navigation/native";
import { Box, View, Text } from "native-base";

import { styles } from "./styles";

import Header from "../../components/LoginScreen/Header";
import InputComponent from "../../components/LoginScreen/Input";
import Button from "../../components/LoginScreen/Button";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const { deviceTheme } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stateSecureText, setStateSecureText] = useState(true);

  let colorScheme = deviceTheme;

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <Box
        bg={colorScheme === "dark" ? "primary.900" : "white"}
        style={styles.container}
      >
        <Header title="Sign Up" subtitle="crie sua conta" />
        <View style={styles.inputBox}>
          <InputComponent
            placeholder="Digite seu e-mail"
            value={email}
            changeText={setEmail}
          />
          <InputComponent
            placeholder="Digite seu nome"
            value={name}
            changeText={setName}
          />

          <InputComponent
            placeholder="******"
            value={password}
            changeText={setPassword}
            type="pass"
            typeInput={stateSecureText}
            changeTypeInput={setStateSecureText}
          />
        </View>
        <View style={styles.btnBox}>
          <Button title="Criar conta" />
          <View style={styles.boxHelpAcount}>
            <Text color={colorScheme === "dark" ? "muted.300" : "primary.900"}>
              tem uma conta?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text color="purple.600">faça login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Box>
    </TouchableNativeFeedback>
  );
}
