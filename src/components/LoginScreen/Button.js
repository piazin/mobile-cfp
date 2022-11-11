import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "native-base";

const Button = ({ title }) => {
  return (
    <TouchableOpacity style={styles.btnLogin}>
      <Text color="white" fontSize="md" fontFamily="body" fontWeight="700">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: "#7E74F1",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 1,
    height: 52,
    width: 332,
  },
});

export default Button;
