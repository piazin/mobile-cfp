import React, { useState, useContext, useEffect } from "react";
import {
  Keyboard,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../contexts/authContext";
import { ThemeContext } from "../../contexts/themeContext";
import { useNavigation } from "@react-navigation/native";
import { Box, View, Text, Progress } from "native-base";

import { styles } from "./styles";

import Header from "../../components/LoginScreen/Header";
import InputComponent from "../../components/LoginScreen/Input";
import Button from "../../components/LoginScreen/Button";

import {
  validateEmail,
  validatePassword,
} from "../../utils/validateFormFieldsUser";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const { deviceTheme } = useContext(ThemeContext);
  const { signUp, loadingAuth } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stateSecureText, setStateSecureText] = useState(true);
  const [validateForm, setValidateForm] = useState(false);
  const [progressForm, setProgressForm] = useState(0);
  const [validateErrorMessage, setValidateErrorMessage] = useState(null);

  async function onSubmit() {
    if (name.length < 1) {
      return setValidateForm(false);
    }

    if (!validateEmail(email)) {
      setValidateErrorMessage("insira um email válido");
      setValidateForm(false);
      setTimeout(() => {
        setValidateErrorMessage(null);
      }, 10000);
      return;
    }

    if (!validatePassword(password)) {
      setValidateErrorMessage("insira uma senha forte");
      setValidateForm(false);
      setTimeout(() => {
        setValidateErrorMessage(null);
      }, 10000);
      return;
    }
  }

  useEffect(() => {
    handleProgressForm();
  }, [name, email, password]);

  const handleName = (name) => {
    if (name.length <= 1) {
      setName(name);
      setValidateForm(false);
    } else {
      setName(name);
      setValidateForm(true);
    }
  };

  const handleEmail = (email) => {
    if (!validateEmail(email)) {
      setEmail(email);
      setValidateForm(false);
    } else {
      setEmail(email);
      setValidateForm(true);
    }
  };

  const handlePassword = (password) => {
    if (!validatePassword(password)) {
      setPassword(password);
      setValidateForm(false);
    } else {
      setPassword(password);
      setValidateForm(true);
    }
  };

  const handleProgressForm = () => {
    var progressName = name.length <= 0 ? 0 : 20;
    var progressEmail = !validateEmail(email) ? 0 : 40;
    var progressPass = !validatePassword(password) ? 0 : 40;

    setProgressForm(progressName + progressEmail + progressPass);
  };

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <Box
        bg={deviceTheme === "dark" ? "primary.900" : "white"}
        style={styles.container}
      >
        <Header title="Sign Up" subtitle="crie sua conta" />
        <View style={styles.inputBox}>
          {validateErrorMessage ? (
            <Text
              color="red.400"
              alignSelf="center"
              fontFamily="body"
              fontWeight="500"
            >
              {validateErrorMessage}
            </Text>
          ) : null}

          <InputComponent
            placeholder="Digite seu nome"
            value={name}
            changeText={handleName}
          />
          <InputComponent
            placeholder="Digite seu e-mail"
            value={email}
            changeText={handleEmail}
          />
          <InputComponent
            placeholder="******"
            value={password}
            changeText={handlePassword}
            type="pass"
            typeInput={stateSecureText}
            changeTypeInput={setStateSecureText}
          />
          <Progress
            mx={1}
            size="xs"
            value={progressForm}
            _filledTrack={{ bg: "purple.600" }}
          />
        </View>
        <View style={styles.btnBox}>
          <Button
            title="Criar conta"
            onPressFunction={onSubmit}
            isLoading={loadingAuth}
            buttonState={validateForm}
          />
          <View style={styles.boxHelpAcount}>
            <Text color={deviceTheme === "dark" ? "muted.300" : "primary.900"}>
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
