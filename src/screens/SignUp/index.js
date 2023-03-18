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
  const [showPassword, setShowPassword] = useState(true);
  const [validateForm, setValidateForm] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  async function onSubmitForm() {
    await signUp({ name, email, password });
  }

  useEffect(() => {
    handleFormProgress();
  }, [name, email, password, formProgress]);

  const handleNameChange = (value) => setName(value);

  const handleEmailChange = (value) => setEmail(value.trim());

  const handlePasswordChange = (value) => setPassword(value.trim());

  const handleFormProgress = () => {
    var nameProgress = name.length <= 0 ? 0 : 20;
    var emailProgress = !validateEmail(email) ? 0 : 40;
    var passProgress = !validatePassword(password) ? 0 : 40;

    setFormProgress(nameProgress + emailProgress + passProgress);
    formProgress == 100 ? setValidateForm(true) : setValidateForm(false);
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
            changeText={handleNameChange}
          />
          <InputComponent
            placeholder="Digite seu e-mail"
            value={email}
            changeText={handleEmailChange}
          />
          <InputComponent
            placeholder="Crie uma senha forte"
            value={password}
            changeText={handlePasswordChange}
            type="pass"
            typeInput={showPassword}
            changeTypeInput={setShowPassword}
          />
          <Progress
            mx={1}
            size="xs"
            value={formProgress}
            _filledTrack={{ bg: 'purple.600' }}
          />
        </View>
        <View style={styles.btnBox}>
          <Button
            title="Criar conta"
            onPressFunction={onSubmitForm}
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
