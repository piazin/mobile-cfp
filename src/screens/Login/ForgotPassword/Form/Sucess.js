import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Note } from '../Form/Note';
import Title from '../Form/Title';

import Button from '../Form/Button';
import { Illustration } from '../Form/Illustration';
import passwordChangedImg from '../../../../assets/passwordchanged.png';

export function Sucess() {
  const navigation = useNavigation();

  return (
    <>
      <Illustration source={passwordChangedImg} alt="password changed" />
      <Title title="Senha redefinida com sucesso" />
      <Note note="Agora você pode fazer login na sua conta" />

      <Button
        onPressFunction={() => navigation.goBack()}
        title="Conecte-se agora"
        buttonState={true}
      />
    </>
  );
}
