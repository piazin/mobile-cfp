import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Spinner, Text } from 'native-base';

export function Button({ title, onPress, isDisabled, isLoading, innerRef }) {
  return (
    <TouchableOpacity
      ref={innerRef}
      onPress={() => onPress()}
      style={[styles.button, { opacity: isDisabled || isLoading ? 0.6 : 1 }]}
      disabled={isDisabled || isLoading ? true : false}
    >
      {isLoading ? (
        <Spinner color="white" size="sm" />
      ) : (
        <Text color="white" fontFamily="body" fontWeight="bold" fontSize="lg">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#7E74F1',
    borderRadius: 5,
    padding: 8,
    width: 320,
    marginTop: 22,
    marginBottom: 55,
    height: 45,
    justifyContent: 'center',
  },
});
