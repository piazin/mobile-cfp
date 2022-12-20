import React, { useState } from 'react';
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

  const sendCode = async (code) => {
    setIsLoading(true);

    try {
      const data = await verifyCode(code);
      console.log(data);
      setIsLoading(false);
      switchStage('RESET');
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ code: '' }}
      onSubmit={(values) => sendCode(values.code)}
      validationSchema={Yup.object({
        code: Yup.string()
          .min(6, 'O codigo deve conter 6 digitos')
          .required('Insira seu codigo'),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <>
          <Illustration source={checkEmailImg} alt="check you email" />
          <Title title="Verifique seu e-mail" />
          <Note note={note ? note : ''} />

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
          />
          <Button
            buttonState={errors.code || isLoading ? false : true}
            isLoading={isLoading}
            onPressFunction={handleSubmit}
            title="Verificar código"
          />
        </>
      )}
    </Formik>
  );
}
