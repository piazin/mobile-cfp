import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';
import { Text } from 'native-base';

export function Header({ title, style }) {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { ...style }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon iconLibraryName="MaterialIcons" name="arrow-back-ios" size={32} color="#fff" />
      </TouchableOpacity>
      <Text color="white" fontFamily="heading" fontSize="lg" fontWeight="medium" marginLeft={6}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 25,
  },
});
