import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Box, Text } from 'native-base';

import { styles } from './styles';

import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar';
import { RequestCodeForm } from './RequestCodeForm';

export default function ForgotPasswordScreen() {
  const stages = {
    REQUEST_LINK: 'REQUEST_LINK',
    VERIFY: 'VERIFY',
    RESET: 'RESET',
  };

  const [email, setEmail] = useState('');
  const [stage, setStage] = useState(stages.REQUEST_LINK);

  const switchStage = (stage) => {
    setStage(stage);
  };

  return (
    <Box bg="primary.900" style={styles.container}>
      <Text color="white" fontSize="lg" fontFamily="body">
        Redefinir senha
      </Text>
      {stage === 'REQUEST_LINK' && (
        <RequestCodeForm
          email={email}
          setEmail={setEmail}
          switchStage={switchStage}
        />
      )}

      {stage === 'VERIFY' && <Text>Hello from VERIFY</Text>}

      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
    </Box>
  );
}
