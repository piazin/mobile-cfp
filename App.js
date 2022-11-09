import Routes from "./src/routes/index.routes";

import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Routes />
        <StatusBar style="inverted" translucent={false} />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
