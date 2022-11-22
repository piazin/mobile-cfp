import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../contexts/authContext";

import { styles, lightMode } from "./styles";
import Header from "../../components/HomeScreen/Header";
import BoxBalance from "../../components/HomeScreen/BoxBalance";
import BoxShortcutIcons from "../../components/HomeScreen/BoxShortcutIcons";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header user={user} />
      <View style={styles.container}>
        <BoxBalance balance={user?.balance} />
        <BoxShortcutIcons />
      </View>
    </>
  );
}
