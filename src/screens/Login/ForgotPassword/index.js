import React, { useState } from 'react';
import { Text, KeyboardAvoidingView } from 'native-base';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { styles } from './styles';

import { VerifyCode } from './VerifyCode';
import { ResetPassForm } from './ResetPassForm';
import { RequestCodeForm } from './RequestCodeForm';

import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar';

export default function ForgotPasswordScreen() {
  const stages = {
    REQUEST_LINK: 'REQUEST_LINK',
    VERIFY: 'VERIFY',
    RESET: 'RESET',
  };

  const [email, setEmail] = useState('');
  const [msgState, setMsgState] = useState('');
  const [stage, setStage] = useState(stages.REQUEST_LINK);

  const switchStage = (stage) => {
    setStage(stage);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container}>
        {stage === 'REQUEST_LINK' && (
          <RequestCodeForm
            setMsgState={setMsgState}
            setEmail={setEmail}
            switchStage={switchStage}
          />
        )}

        {stage === 'VERIFY' && (
          <VerifyCode note={msgState} switchStage={switchStage} />
        )}

        {stage === 'RESET' && (
          <ResetPassForm switchStage={switchStage} email={email} />
        )}

        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor="#1e1e1e"
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
