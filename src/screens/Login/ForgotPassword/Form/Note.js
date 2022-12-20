import React from 'react';
import { Text } from 'native-base';

export function Note({ note }) {
  return (
    <Text
      color="white"
      lineHeight={20}
      fontSize={14}
      textAlign="center"
      paddingX={16}
      marginBottom="10"
      marginTop="2"
      fontWeight="light"
    >
      {note}
    </Text>
  );
}
