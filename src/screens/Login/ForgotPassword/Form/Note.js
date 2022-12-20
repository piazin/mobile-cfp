import React from 'react';
import { Text } from 'native-base';

export function Note({ note }) {
  return (
    <Text
      color="white"
      lineHeight={20}
      fontSize={14}
      textAlign="center"
      paddingX={15}
      marginY={10}
      fontWeight="medium"
    >
      {note}
    </Text>
  );
}
