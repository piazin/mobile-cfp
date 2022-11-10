import React from "react";
import Routes from "./src/routes/index.routes";

import { NativeBaseProvider } from "native-base";

import ThemeProvider from "./src/contexts/themeContext";

import { NavigationContainer } from "@react-navigation/native";
import { theme } from "./src/styles/styles";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
