import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function ShortcutIcons({ iconName, label, routeName, typeTransaction }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        width: 105,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
      }}
      onPress={() =>
        navigation.navigate(routeName, {
          typeTransaction,
        })
      }
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
      <Text color="white" textAlign="center" marginTop={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
