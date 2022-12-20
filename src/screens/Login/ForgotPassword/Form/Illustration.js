import React from 'react';
import { Image } from 'native-base';

export const Illustration = ({ source, alt }) => {
  return <Image source={source} size="3xs" alt={alt} />;
};
