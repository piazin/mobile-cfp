import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Text } from "react-native";

export function ButtonNew({ size, color }) {
  return (
    <View style={styles.container}>
      <Ionicons name="add" color={color} size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#7E74F1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
});
