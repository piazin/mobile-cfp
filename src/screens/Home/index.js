import React, { useContext } from "react";
import { View, Text, StatusBar } from "react-native";
import { ThemeContext } from "../../contexts/themeContext";

import { darkMode, lightMode } from "./styles";

const statusBarHeight = StatusBar.currentHeight;

export default function HomeScreen() {
  const { deviceTheme } = useContext(ThemeContext);
  const styles = deviceTheme === "dark" ? darkMode : lightMode;

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Text>Home Screen</Text>
    </View>
  );
}
