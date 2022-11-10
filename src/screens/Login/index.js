import React, { useState } from "react";
import {
  Keyboard,
  StatusBar,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Box, View, Text } from "native-base";

import { styles } from "./styles";

import Header from "../../components/LoginScreen/Header";
import InputComponent from "../../components/LoginScreen/Input";
import Button from "../../components/LoginScreen/Button";

const statusBarHeight = StatusBar.currentHeight;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stateSecureText, setStateSecureText] = useState(true);

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <Box bg="primary.900" style={styles.container}>
        <Header />
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
          <Button />
          <View style={styles.boxHelpAcount}>
            <Text color="muted.300">não tem uma conta?</Text>
            <TouchableOpacity>
              <Text color="purple.600">criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1E1E1E"
          translucent
        />
      </Box>
    </TouchableNativeFeedback>
  );
}
