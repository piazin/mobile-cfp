import React, { useState } from "react";
import styles from "./styles";
import {
  TextInput,
  Text,
  SafeAreaView,
  TouchableNativeFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { View } from "native-base";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableNativeFeedback
      onPress={() => Keyboard.dismiss()}
      background={TouchableNativeFeedback.Ripple("transparent")}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.textAppName}>CFP</Text>
          <Text>acesse sua conta</Text>
        </View>
        <View style={styles.mainView}>
          <TextInput
            placeholder="Digite seu e-mail"
            style={styles.inputEmailAndPassword}
            onChange={(value) => setEmail(value)}
            underlineColorAndroid="transparent"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
          />
          <View>
            <TextInput
              placeholder="******"
              style={styles.inputEmailAndPassword}
              onChange={(value) => setPassword(value)}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              value={password}
            />
            <TouchableNativeFeedback>
              <Text>Icon</Text>
            </TouchableNativeFeedback>
          </View>
        </View>

        <TouchableOpacity style={styles.btnLogIn}>
          <Text style={styles.textLogIn}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textHelp}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSignIn}>
          <Text style={[styles.textHelp, { marginTop: 10 }]}>Criar conta</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableNativeFeedback>
  );
};

export default Login;
