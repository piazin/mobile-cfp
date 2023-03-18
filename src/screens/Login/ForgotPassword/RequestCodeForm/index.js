import * as Yup from 'yup';
import { Formik } from 'formik';
import { Text } from 'native-base';
import { Keyboard } from 'react-native';
import React, { useState, useCallback } from 'react';

import Title from '../Form/Title';
import { Note } from '../Form/Note';
import Button from '../Form/Button';
import TextInput from '../Form/TextInput';
import { Illustration } from '../Form/Illustration';
import { userService } from '../../../../services/user';
import ForgotPasswordImg from '../../../../assets/forgotpass.png';

export function RequestCodeForm({ setMsgState, setEmail, switchStage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [msgServerError, setMsgServerError] = useState(null);

  const onSubmitCode = useCallback(
    async ({ email }) => {
      setIsLoading(true);
      Keyboard.dismiss();

      try {
        const response = await userService.requestRecoveryCode(email);
        setEmail(email);
        setMsgState(response?.message);
        switchStage('VERIFY');
      } catch (error) {
        setErr(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
    [userService]
  );

  const setErr = (msg) => {
    setMsgServerError(msg);
    setTimeout(() => {
      setMsgServerError(null);
    }, 4000);
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values) => onSubmitCode(values)}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Email invalido')
          .required('É necessário um endereço de e-mail'),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <>
          <Illustration source={ForgotPasswordImg} alt="fogot password img" />
          <Title title="Esqueceu a senha?" />
          <Note note="Não se preocupe, isso acontece com o melhor de nós." />

          {msgServerError ? (
            <Text color="red.400">{msgServerError}</Text>
          ) : null}

          <TextInput
            placeholder="Digite seu email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            ionIcon="email"
            autoCapitalize="none"
            placeholderTextColor="#666"
            clearButtonMode="while-editing"
            keyboardType="email-address"
            maxLength={100}
            error={errors.email}
          />
          <Button
            buttonState={errors.email || isLoading ? false : true}
            isLoading={isLoading}
            onPressFunction={handleSubmit}
            title="Continuar"
          />
        </>
      )}
    </Formik>
  );
}
