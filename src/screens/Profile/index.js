import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

import { View, StatusBar } from "react-native";
import styles from "./styles";

import { FocusAwareStatusBar } from "../../components/FocusAwareStatusBar";
import { SelectAnImage } from "../../components/ProfileScreen/SelectAnImage";

const statusBarHeight = StatusBar.currentHeight;

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <SelectAnImage user={user} />
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
    </View>
  );
}
