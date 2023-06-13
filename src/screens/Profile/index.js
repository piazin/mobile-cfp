import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

import { View, StatusBar } from 'react-native';
import { Avatar, Box, Text } from 'native-base';
import styles from './styles';

import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { SelectAnImage } from '../../components/ProfileScreen/SelectAnImage';
import ProfileActionButton from '../../components/ProfileScreen/ProfileActionButton';

const statusBarHeight = StatusBar.currentHeight;

export default function ProfileScreen({ navigation }) {
  const { user, logOut } = useContext(AuthContext);

  const logOutUser = () => {
    logOut();
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Box width="100%" alignItems="center" paddingTop="6">
        <Avatar
          bg="primary.800"
          source={{
            uri: user.avatar
              ? user.avatar.url
              : 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
          }}
          width="24"
          height="24"
          borderRadius={50}
        />

        <Text color="white" fontFamily="heading" fontWeight="bold" fontSize={22} marginTop="4">
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
          Conta
        </Text>

        <ProfileActionButton
          text="Editar perfil"
          iconName="user-edit"
          iconLibName="FontAwesome5"
          onPress={() => navigation.navigate('EditDataScreen', { type: 'password' })}
        />
        <ProfileActionButton
          text="Alterar senha"
          iconName="account-lock"
          iconLibName="MaterialCommunityIcons"
          style={{ marginTop: 0 }}
          iconParams={{ size: 38 }}
        />

        <ProfileActionButton
          text="Gerenciar categorias"
          iconName="package"
          iconLibName="Feather"
          style={{ marginTop: 0 }}
          iconParams={{ size: 35 }}
          onPress={() => navigation.navigate('CategoriesScreen')}
        />

        <Text
          color="white"
          fontFamily="heading"
          fontWeight="bold"
          fontSize="lg"
          marginTop="3"
          alignSelf="flex-start"
          marginLeft="8"
        >
          Ações
        </Text>

        <ProfileActionButton
          text="Sair"
          iconName="logout"
          iconLibName="AntDesign"
          onPress={() => logOutUser()}
        />
      </Box>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
    </View>
  );
}
