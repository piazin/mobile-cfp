import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

import { View, StatusBar } from 'react-native';
import { Box, Text, Divider, Button } from 'native-base';
import styles from './styles';

import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { SelectAnImage } from '../../components/ProfileScreen/SelectAnImage';
import { Modal } from '../../components/HomeScreen/Modal';

const statusBarHeight = StatusBar.currentHeight;

export default function ProfileScreen() {
  const { user, logOut } = useContext(AuthContext);

  const logOutUser = () => {
    logOut();
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Box width="100%" alignItems="center" paddingTop="6">
        <SelectAnImage user={user} />
        <Text
          color="muted.400"
          fontFamily="heading"
          fontWeight="bold"
          fontSize={18}
          marginTop="3"
        >
          Olá
        </Text>
        <Text
          color="white"
          fontFamily="heading"
          fontWeight="bold"
          fontSize={22}
          marginTop="1"
        >
          {user.name}
        </Text>

        <Text
          color="muted.400"
          fontFamily="heading"
          fontWeight="normal"
          fontSize="md"
          marginTop="1"
        >
          {user.email}
        </Text>
      </Box>
      <Box alignItems="center">
        <Text
          color="white"
          fontFamily="heading"
          fontWeight="bold"
          fontSize="lg"
          marginTop="10"
          alignSelf="flex-start"
          marginLeft="8"
        >
          Basic Info
        </Text>
        <Box
          width={366}
          height={206}
          bg="primary.800"
          borderRadius={10}
          marginTop="2"
        >
          <Box paddingTop={2} paddingX={4}>
            <Box>
              <Text
                color="white"
                fontFamily="body"
                fontWeight="medium"
                fontSize="md"
                marginTop="1"
              >
                NAME
              </Text>
              <Text
                color="white"
                fontFamily="body"
                fontWeight="medium"
                fontSize="md"
                marginTop="4"
              >
                {user.name}
              </Text>
              <Divider my="2" />
            </Box>
            <Box>
              <Text
                color="white"
                fontFamily="body"
                fontWeight="medium"
                fontSize="md"
                marginTop="1"
              >
                EMAIL
              </Text>
              <Text
                color="white"
                fontFamily="body"
                fontWeight="medium"
                fontSize="md"
                marginTop="4"
              >
                {user.email}
              </Text>
              <Divider my="2" />
            </Box>
          </Box>
        </Box>

        <Text
          color="purple.600"
          fontFamily="body"
          fontWeight="bold"
          fontSize="lg"
          marginTop="5"
          onPress={() => logOutUser()}
        >
          Sair
        </Text>
      </Box>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
    </View>
  );
}
