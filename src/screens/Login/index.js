import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Keyboard,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { AuthContext } from '../../contexts/authContext';
import { Box, View, Text } from 'native-base';

import { styles } from './styles';

import Header from '../../components/LoginScreen/Header';
import Button from '../../components/LoginScreen/Button';
import InputComponent from '../../components/LoginScreen/Input';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';

import { validateEmail } from '../../utils/validateFormFieldsUser';

export default function LoginScreen() {
  const navigation = useNavigation();

  const { signIn, loadingAuth, errorLogin } = useContext(AuthContext);
  const { deviceTheme } = useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [validateForm, setValidateForm] = useState(false);

  const handleEmailChange = (value) => {
    const isValidEmail = validateEmail(value.trim());
    setValidateForm(isValidEmail);
    setEmail(value.trim());
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    await signIn(email, password);
  };

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <Box
        bg={deviceTheme === 'dark' ? 'primary.900' : 'white'}
        style={styles.container}
      >
        <Header title="CFP" subtitle="acesse sua conta" />
        {errorLogin ? <Text style={{ color: 'red' }}>{errorLogin}</Text> : null}
        <View style={styles.inputBox}>
          <InputComponent
            placeholder="Digite seu e-mail"
            value={email}
            changeText={handleEmailChange}
          />
          <InputComponent
            placeholder="Digite sua senha"
            value={password}
            changeText={setPassword}
            type="pass"
            typeInput={showPassword}
            changeTypeInput={setShowPassword}
          />
          <TouchableOpacity
            style={styles.btnForgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text color="purple.600">esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnBox}>
          <Button
            title="Login"
            buttonState={validateForm}
            onPressFunction={handleLogin}
            isLoading={loadingAuth}
          />
          <View style={styles.boxHelpAcount}>
            <Text color={deviceTheme === 'dark' ? 'muted.300' : 'primary.900'}>
              não tem uma conta?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text color="purple.600">criar conta</Text>
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
