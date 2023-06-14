import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'native-base';

import styles from './styles';
import { Icon } from '../../Global/Icon';

export function SelectAnImage({ user, style, setPhoto }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.cancelled) return;

    setPhoto(result);
    setSelectedImage(result.uri);
  };

  return (
    <TouchableOpacity onPress={() => pickImageAsync()}>
      {selectedImage ? (
        <Avatar source={{ uri: selectedImage }} style={style ? { ...style } : styles.profilePic}>
          <Avatar.Badge
            bg="primary.800"
            borderWidth={0.8}
            alignItems="flex-end"
            size="5"
            justifyContent="flex-end"
          >
            <Icon iconLibraryName="MaterialIcons" name="edit" size={17} color="#fff" />
          </Avatar.Badge>
        </Avatar>
      ) : (
        <Avatar
          source={{
            uri: user.avatar
              ? user.avatar.url
              : 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
          }}
          style={styles.profilePic}
        >
          <Avatar.Badge
            bg="primary.800"
            borderWidth={0.8}
            alignItems="flex-end"
            size="5"
            justifyContent="flex-end"
          >
            <Icon iconLibraryName="MaterialIcons" name="edit" size={17} color="#fff" />
          </Avatar.Badge>
        </Avatar>
      )}
    </TouchableOpacity>
  );
}
