import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Note } from '../Form/Note';
import Title from '../Form/Title';

import { UserClass } from '../../../../services/api';
const { resetPassword } = new UserClass();

import Button from '../Form/Button';
import { Illustration } from '../Form/Illustration';
import changePass from '../../../../assets/changepass.png';
import TextInput from '../Form/TextInput';

import { Sucess } from '../Form/Sucess';

export function ResetPassForm({ switchStage, email }) {
  const [isLoading, setIsLoading] = useState(false);
  const [msgServerError, setMsgServerError] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const sendCode = async (password) => {
    setIsLoading(true);
    Keyboard.dismiss();

    try {
      setIsLoading(false);
      const data = await resetPassword(email, password);
      if (data?.status !== 200) {
        setErr(data.message);
        return;
      }
      setPasswordChanged(true);
    } catch (error) {
      setIsLoading(false);
      setErr(error.message);
    }
  };

  const setErr = (msg) => {
    setMsgServerError(msg);
    setTimeout(() => {
      setMsgServerError(null);
    }, 4000);
  };

  if (passwordChanged) return <Sucess />;

  return (
    <Formik
      initialValues={{ password: '' }}
      onSubmit={(values) => sendCode(values.password)}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(6, 'A senha deve ter no minimo 6 digitos')
          .max(100)
          .required('Insira uma senha valida'),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <>
          <Illustration source={changePass} alt="change you password" />
          <Title title="Redefina sua senha" />
          <Note note="Aqui vai uma dica: Use uma combinação de números, maiúsculas, minúsculas e caracteres especiais" />

          {msgServerError ? (
            <Text color="red.400">{msgServerError}</Text>
          ) : null}

          <TextInput
            placeholder="Digite sua nova senha"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            ionIcon="lock-outline"
            autoCapitalize="none"
            placeholderTextColor="#666"
            clearButtonMode="while-editing"
            secureTextEntry={true}
            error={errors.password}
          />
          <Button
            buttonState={errors.password || isLoading ? false : true}
            isLoading={isLoading}
            onPressFunction={handleSubmit}
            title="Redefinir senha"
          />
        </>
      )}
    </Formik>
  );
}
