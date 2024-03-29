import React from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Box, Text, Avatar } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const statusBarHeight = StatusBar.currentHeight - 1;

const Header = ({ user, handleBalanceViewState, balanceViewState }) => {
  const navigation = useNavigation();

  return (
    <Box backgroundColor="purple.600" paddingTop={statusBarHeight} style={styles.headerBox}>
      <Box flexDirection="row" alignItems="center" justifyContent="space-between" paddingTop={4}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Avatar
            bg="primary.900"
            source={{
              uri: user.avatar
                ? user.avatar.url
                : 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
            }}
            style={styles.profilePic}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleBalanceViewState()}>
          <Ionicons
            name={balanceViewState ? 'eye-outline' : 'eye-off-outline'}
            color="#ffffff"
            size={30}
          />
        </TouchableOpacity>
      </Box>
      <Box marginTop="6">
        <Text color="white" fontFamily="heading" fontWeight="bold" fontSize={22}>
          Olá, {user?.name?.split(' ')[0]}
        </Text>
      </Box>
    </Box>
  );
};

export default Header;
