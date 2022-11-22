import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Box, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function ShortcutIcons({ iconName, label }) {
  return (
    <TouchableOpacity
      style={{
        width: 105,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
      }}
    >
      <Box
        width={75}
        height={75}
        backgroundColor="#151515"
        justifyContent="center"
        alignItems="center"
        borderRadius={50}
      >
        <MaterialCommunityIcons name={iconName} color="#fff" size={42} />
      </Box>
      <Text color="white" textAlign="center" marginTop={5}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
