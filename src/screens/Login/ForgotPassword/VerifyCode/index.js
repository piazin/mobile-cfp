import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button, Input } from 'native-base';
import { Note } from '../Form/Note';

import { UserClass } from '../../../../services/api';
const { requestRecoveryCode } = new UserClass();

export function VerifyCode({ note }) {
  return (
    <View>
      <Note note={note} />
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
