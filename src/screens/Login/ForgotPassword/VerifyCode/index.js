import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Note } from '../Form/Note';
import Title from '../Form/Title';

import { UserClass } from '../../../../services/api';
const { verifyCode } = new UserClass();

import Button from '../Form/Button';
import { Illustration } from '../Form/Illustration';
import checkEmailImg from '../../../../assets/checkemail.png';
import TextInput from '../Form/TextInput';

export function VerifyCode({ note, switchStage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [msgServerError, setMsgServerError] = useState(null);
  const [codeExpiredIn, setCodeExpiredIn] = useState(300);

  const sendCode = async (code) => {
    setIsLoading(true);
    Keyboard.dismiss();

    try {
      setIsLoading(false);
      const data = await verifyCode(code);
      if (!data?.status) {
        setErr(data.message);
        return;
      }
      switchStage('RESET');
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCodeExpiredIn((codeExpiredIn) => codeExpiredIn - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
    }, 304000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(codeExpiredIn / 60);
  const seconds = codeExpiredIn % 60;

  return (
    <Formik
      initialValues={{ code: '' }}
      onSubmit={(values) => sendCode(values.code)}
      validationSchema={Yup.object({
        code: Yup.string()
          .min(5, 'O codigo deve conter no minimo 5 digitos')
          .required('Insira seu codigo'),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <>
          {minutes <= 0 && seconds <= 0 ? (
            <>
              <Illustration source={checkEmailImg} alt="check you email" />
              <Note note="Codigo expirado" />
              <Button
                buttonState={isLoading ? false : true}
                isLoading={isLoading}
                onPressFunction={() => switchStage('REQUEST_LINK')}
                title="Enviar codigo novamente"
              />
            </>
          ) : (
            <>
              <Illustration source={checkEmailImg} alt="check you email" />
              <Title title="Verifique seu e-mail" />
              <Note note={note ? note : ''} />

              {msgServerError ? (
                <Text color="red.400">{msgServerError}</Text>
              ) : null}

              <TextInput
                placeholder="copie e cole seu código"
                onChangeText={handleChange('code')}
                onBlur={handleBlur('code')}
                value={values.code}
                ionIcon="keyboard-arrow-right"
                autoCapitalize="none"
                placeholderTextColor="#666"
                clearButtonMode="while-editing"
                keyboardType="numeric"
                maxLength={6}
                error={errors.code}
                editable={codeExpiredIn <= 0 ? false : true}
              />

              <Button
                buttonState={
                  errors.code || isLoading || codeExpiredIn <= 0 ? false : true
                }
                isLoading={isLoading}
                onPressFunction={handleSubmit}
                title="Verificar código"
              />
              <Note note={`${minutes}:${seconds}`} />
            </>
          )}
        </>
      )}
    </Formik>
  );
}
