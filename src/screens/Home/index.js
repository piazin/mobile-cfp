import React, { useContext } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/themeContext";
import { AuthContext } from "../../contexts/authContext";

import { darkMode, lightMode } from "./styles";

const statusBarHeight = StatusBar.currentHeight;

export default function HomeScreen() {
  const navigation = useNavigation();

  const { deviceTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const styles = deviceTheme === "dark" ? darkMode : lightMode;

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{
              uri: user.avatar
                ? user.avatar.url
                : "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
            }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <View>
          <Text style={[styles.globalTextColor, styles.welcomeText]}>
            Welcome Back 👋{" "}
          </Text>
          <Text style={[styles.globalTextColor, styles.userNameText]}>
            {user?.name}
          </Text>
        </View>
      </View>
      <View style={styles.balanceBox}>
        <View style={styles.balanceInfo}>
          <View style={styles.waveBalanceRight}></View>
          <View style={styles.waveBalanceLeft}></View>
          <Text style={styles.currentBalance}>Current Balance</Text>
          <Text style={styles.balanceAmount}>R$ 140,000.00</Text>
        </View>
      </View>
    </View>
  );
}
