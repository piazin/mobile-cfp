import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TextInput as Input, StyleSheet, View } from 'react-native';
import { ErrorMessage } from './ErrorMessage';

const TextInput = ({ ionIcon, error, ...rest }) => {
  return (
    <>
      {error && <ErrorMessage msg={error} />}
      <View style={styles.inputWrap}>
        <View style={styles.inputIcon}>
          <MaterialIcons name={ionIcon} size={25} />
        </View>
        <Input {...rest} style={styles.input} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    width: '85%',
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  inputIcon: {
    marginRight: 14,
  },
  input: {
    paddingVertical: 13,
    fontSize: 16,
    fontWeight: '600',
    flexGrow: 1,
    width: '100%',
  },
});

export default TextInput;
