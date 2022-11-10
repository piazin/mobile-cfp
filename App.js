import Routes from "./src/routes/index.routes";

import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { theme } from "./src/styles/styles";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Routes />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
