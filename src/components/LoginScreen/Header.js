import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";

const Header = () => {
  return (
    <View style={styles.headerBox}>
      <Text
        color="purple.600"
        fontFamily="body"
        fontWeight="700"
        fontSize="4xl"
      >
        CFP
      </Text>
      <Text
        color="muted.300"
        fontFamily="heading"
        fontWeight="500"
        fontSize="md"
      >
        acesse sua conta
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    alignItems: "center",
    marginBottom: 22,
  },
});

export default Header;
