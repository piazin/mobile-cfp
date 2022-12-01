import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "native-base";

export function Button({ title, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.button}>
      <Text color="white" fontFamily="body" fontWeight="bold" fontSize="lg">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#7E74F1",
    borderRadius: 5,
    padding: 8,
    width: 320,
    marginTop: 22,
  },
});
