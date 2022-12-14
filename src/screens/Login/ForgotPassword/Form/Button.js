import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Spinner, Text } from 'native-base';

const Button = ({ title, onPressFunction, isLoading, buttonState }) => {
  return (
    <TouchableOpacity
      style={[styles.btnLogin, { opacity: buttonState ? 1 : 0.5 }]}
      onPress={() => onPressFunction()}
      disabled={!buttonState}
    >
      {isLoading ? (
        <Spinner color="white" size="sm" />
      ) : (
        <Text color="white" fontSize="md" fontFamily="body" fontWeight="700">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: '#7E74F1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 1,
    height: 52,
    width: '85%',
    marginTop: 22,
    marginBottom: 10,
  },
});

export default Button;
