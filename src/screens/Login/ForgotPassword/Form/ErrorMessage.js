import React from 'react';
import { Text } from 'native-base';

export const ErrorMessage = ({ msg }) => {
  return <Text color="red.400">{msg}</Text>;
};
