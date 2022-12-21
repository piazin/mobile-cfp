import React from 'react';
import { Text } from 'native-base';

export function Note({ note }) {
  return (
    <Text
      color="white"
      lineHeight={20}
      fontSize={14}
      textAlign="center"
      paddingX={5}
      marginBottom="10"
      marginTop="4"
      fontWeight="light"
    >
      {note}
    </Text>
  );
}
