import * as Yup from 'yup';
import { Formik } from 'formik';
import { Text } from 'native-base';
import { Keyboard } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import Title from '../Form/Title';
import { Note } from '../Form/Note';
import Button from '../Form/Button';
import TextInput from '../Form/TextInput';
import { Illustration } from '../Form/Illustration';
import checkEmailImg from '../../../../assets/checkemail.png';

import { userService } from '../../../../services/user';

export function VerifyCode({ note, switchStage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [msgServerError, setMsgServerError] = useState(null);
  const [codeExpiredIn, setCodeExpiredIn] = useState(300);

  const onSubmitCode = useCallback(
    async (code) => {
      setIsLoading(true);
      Keyboard.dismiss();

      try {
        await userService.verifyCode(code);
        switchStage('RESET');
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCodeExpiredIn((codeExpiredIn) => codeExpiredIn - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
    }, 304000);

    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(codeExpiredIn / 60)).padStart(2, '0');
  const seconds = String(codeExpiredIn % 60).padStart(2, '0');

  return (
    <Formik
      initialValues={{ code: '' }}
      onSubmit={(values) => onSubmitCode(values.code)}
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
