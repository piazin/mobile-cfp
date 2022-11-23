import React, { useState, useContext } from "react";
import api from "../../../config/axios";
import * as ImagePicker from "expo-image-picker";
import { Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../../../contexts/authContext";

import styles from "./styles";

export function SelectAnImage({ user }) {
  const { setNewData, newData } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.cancelled) return;

    onSubmitProfilePic(result);
    setSelectedImage(result.uri);
  };

  const onSubmitProfilePic = async (photo) => {
    let data = new FormData();

    let splitUri = photo.uri.split(".");
    let getMimeType = splitUri[splitUri.length - 1];

    data.append("owner", user._id);
    data.append("avatar", {
      uri: photo.uri,
      name: `profile-pic-${user.name}.${getMimeType}`,
      type: `${photo.type}/${getMimeType}`,
    });

    try {
      var response = await api.post("/user/avatar", data, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });

      if (response) setNewData(!newData);
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <TouchableOpacity onPress={() => pickImageAsync()}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.profilePic} />
      ) : (
        <Image
          source={{
            uri: user.avatar
              ? user.avatar.url
              : "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
          }}
          style={styles.profilePic}
        />
      )}
    </TouchableOpacity>
  );
}
