import { Text } from 'native-base';
import { StyleSheet, TextInput, View } from 'react-native';

export default function Input({ value, setValue, placeholder, labelName }) {
  return (
    <View>
      <Text color="white" fontFamily="body" fontWeight="bold" fontSize="md">
        {labelName}
      </Text>
      <TextInput
        value={value}
        style={styles.input}
        onChangeText={(value) => setValue(value)}
        placeholder={placeholder}
        placeholderTextColor="#727272"
        keyboardType="default"
        autoCapitalize="none"
        clearButtonMode="while-editing"
        keyboardAppearance="dark"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderColor: '#727272',
    borderWidth: 1,
    color: '#F5F5F5',
    fontSize: 16,
    padding: 15,
    marginVertical: 10,
    height: 52,
    width: 332,
  },
});