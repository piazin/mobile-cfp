import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, View, StatusBar, BackHandler } from "react-native";
import LottieView from "lottie-react-native";
import { FocusAwareStatusBar } from "../components/FocusAwareStatusBar";

export function Splash() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/splashscreen.json")}
        autoPlay
        loop={fontLoad}
        speed={1.0}
        onAnimationFinish={() => {
          navigation.navigate("Login");
        }}
      />
      <FocusAwareStatusBar backgroundColor="#7E74F1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#7E74F1",
  },
});
