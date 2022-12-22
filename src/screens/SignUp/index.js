import React, { useState, useContext, useEffect } from 'react';
import {
  Keyboard,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../../contexts/authContext';
import { ThemeContext } from '../../contexts/themeContext';
import { useNavigation } from '@react-navigation/native';
import { Box, View, Text, Progress } from 'native-base';

import { styles } from './styles';

import Header from '../../components/LoginScreen/Header';
import InputComponent from '../../components/LoginScreen/Input';
import Button from '../../components/LoginScreen/Button';

import {
  validateEmail,
  validatePassword,
} from '../../utils/validateFormFieldsUser';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';

export default function SignUpScreen() {
  const navigation = useNavigation();

  const { deviceTheme } = useContext(ThemeContext);
  const { signUp, loadingAuth, errorSignUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stateSecureText, setStateSecureText] = useState(true);
  const [validateForm, setValidateForm] = useState(false);
  const [progressForm, setProgressForm] = useState(0);

  async function handleSignUp() {
    await signUp({ name, email, password });
  }

  useEffect(() => {
    handleProgressForm();
  }, [name, email, password, progressForm]);

  const handleName = (name) => {
    if (name.length <= 1) {
      setName(name);
    } else {
      setName(name);
    }
  };

  const handleEmail = (email) => {
    var email = email.replace(' ', '');
    if (!validateEmail(email)) {
      setEmail(email);
    } else {
      setEmail(email);
    }
  };

  const handlePassword = (password) => {
    if (!validatePassword(password)) {
      setPassword(password);
    } else {
      setPassword(password);
    }
  };

  const handleProgressForm = () => {
    var progressName = name.length <= 0 ? 0 : 20;
    var progressEmail = !validateEmail(email) ? 0 : 40;
    var progressPass = !validatePassword(password) ? 0 : 40;

    setProgressForm(progressName + progressEmail + progressPass);
    progressForm == 100 ? setValidateForm(true) : setValidateForm(false);
  };

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <Box
        bg={deviceTheme === 'dark' ? 'primary.900' : 'white'}
        style={styles.container}
      >
        <Header title="Sign Up" subtitle="crie sua conta" />
        {errorSignUp ? (
          <Text style={{ color: 'red' }}>{errorSignUp}</Text>
        ) : null}
        <View style={styles.inputBox}>
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
            _filledTrack={{ bg: 'purple.600' }}
          />
        </View>
        <View style={styles.btnBox}>
          <Button
            title="Criar conta"
            onPressFunction={handleSignUp}
            isLoading={loadingAuth}
            buttonState={validateForm}
          />
          <View style={styles.boxHelpAcount}>
            <Text color={deviceTheme === 'dark' ? 'muted.300' : 'primary.900'}>
              tem uma conta?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text color="purple.600">faça login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor="#1e1e1e"
        />
      </Box>
    </TouchableNativeFeedback>
  );
}
