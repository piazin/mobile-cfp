import React from "react";
import { View, ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1e1e1e",
      }}
    >
      <ActivityIndicator color="#7E74F1" size={22} />
    </View>
  );
}
