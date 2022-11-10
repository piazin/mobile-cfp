import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { View, Text } from "native-base";

const Header = ({ title, subtitle }) => {
  let colorScheme = useColorScheme();

  return (
    <View style={styles.headerBox}>
      <Text
        color="purple.600"
        fontFamily="body"
        fontWeight="700"
        fontSize="4xl"
      >
        {title}
      </Text>
      <Text
        color={colorScheme === "dark" ? "muted.300" : "primary.900"}
        fontFamily="heading"
        fontWeight="500"
        fontSize="md"
      >
        {subtitle}
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
