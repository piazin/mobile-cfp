import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { View } from "native-base";

export function Splash() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/splashscreen.json")}
        autoPlay
        loop={false}
        speed={1.0}
        onAnimationFinish={() => {
          navigation.navigate("Home2");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
