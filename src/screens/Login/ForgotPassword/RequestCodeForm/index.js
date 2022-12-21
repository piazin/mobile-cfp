import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Note } from '../Form/Note';
import Title from '../Form/Title';

import { UserClass } from '../../../../services/api';
const { requestRecoveryCode } = new UserClass();

import TextInput from '../Form/TextInput';
import Button from '../Form/Button';
import { Illustration } from '../Form/Illustration';
import ForgotPasswordImg from '../../../../assets/forgotpass.png';

export function RequestCodeForm({ setMsgState, setEmail, switchStage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [msgServerError, setMsgServerError] = useState(null);

  const onSubmitCode = (values) => {
    setIsLoading(true);
    Keyboard.dismiss();

    requestRecoveryCode(values.email)
      .then((data) => {
        setIsLoading(false);
        if (data?.status !== 200) {
          setErr(data.message);
          return;
        }
        setEmail(values.email);
        setMsgState(data?.message);
        switchStage('VERIFY');
      })
      .catch((e) => {
        setIsLoading(false);
        setErr(e.message);
      });
  };

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
