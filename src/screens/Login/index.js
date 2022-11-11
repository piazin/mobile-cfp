import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Keyboard,
  StatusBar,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { Box, View, Text } from "native-base";

import { styles } from "./styles";

import Header from "../../components/LoginScreen/Header";
import InputComponent from "../../components/LoginScreen/Input";
import Button from "../../components/LoginScreen/Button";

export default function LoginScreen() {
  const navigation = useNavigation();

  const { deviceTheme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stateSecureText, setStateSecureText] = useState(true);

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <Box
        bg={deviceTheme === "dark" ? "primary.900" : "white"}
        style={styles.container}
      >
        <Header title="CFP" subtitle="acesse sua conta" />
        <View style={styles.inputBox}>
          <InputComponent
            placeholder="Digite seu e-mail"
            value={email}
            changeText={setEmail}
          />
          <InputComponent
            placeholder="******"
            value={password}
            changeText={setPassword}
            type="pass"
            typeInput={stateSecureText}
            changeTypeInput={setStateSecureText}
          />
          <TouchableOpacity style={styles.btnForgotPassword}>
            <Text color="purple.600">esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnBox}>
          <Button title="Login" />
          <View style={styles.boxHelpAcount}>
            <Text color={deviceTheme === "dark" ? "muted.300" : "primary.900"}>
              não tem uma conta?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text color="purple.600">criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Box>
    </TouchableNativeFeedback>
  );
}
