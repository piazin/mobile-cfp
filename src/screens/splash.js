import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  useFonts,
  Inter_900Black,
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { StyleSheet, View, StatusBar } from "react-native";
import LottieView from "lottie-react-native";

export function Splash() {
  const navigation = useNavigation();
  const [fontLoad, setFontLoad] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  });

  useEffect(() => {
    setFontLoad(fontsLoaded ? false : true);
  }, [fontsLoaded]);

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
      <StatusBar backgroundColor="#7E74F1" />
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
