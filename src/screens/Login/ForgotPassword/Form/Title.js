import React from 'react';
import { Text } from 'native-base';

const Title = ({ title }) => {
  return (
    <Text color="white" fontSize="lg" fontFamily="heading" fontWeight="bold">
      {title}
    </Text>
  );
};

export default Title;
