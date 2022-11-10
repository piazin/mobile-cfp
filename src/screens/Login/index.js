import React, { useState } from "react";
import { Keyboard, StatusBar, TouchableNativeFeedback } from "react-native";
import { Box, View } from "native-base";

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
      <Box
        bg="primary.900"
        style={[styles.container, { paddingTop: statusBarHeight }]}
      >
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
        </View>
        <View style={styles.btnBox}>
          <Button />
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
