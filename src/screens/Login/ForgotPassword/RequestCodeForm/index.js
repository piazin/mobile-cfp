import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button, Input } from 'native-base';
import { Note } from '../Form/Note';

import { UserClass } from '../../../../services/api';
const { requestRecoveryCode } = new UserClass();

export function RequestCodeForm({ email, setEmail, switchStage }) {
  const onSubmitCode = async () => {
    try {
      const data = await requestRecoveryCode(email);
      console.log(data);
      switchStage('VERIFY');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Note note="Forneça o endereço de e-mail da sua conta para solicitar uma redefinição de senha. Você receberá um código em seu endereço de e-mail, se for válido." />
      <Input
        placeholder="digite seu email"
        color="white"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <Button marginTop={22} onPress={() => onSubmitCode()}>
        Send
      </Button>
    </View>
  );
}
