import React, { useContext } from "react";
import Routes from "./src/routes/index.routes";

import { NativeBaseProvider } from "native-base";

import ThemeProvider from "./src/contexts/themeContext";
import AuthProvider from "./src/contexts/authContext";
import TransactionProvider from "./src/contexts/transactionsContext";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { theme } from "./src/styles/styles";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <TransactionProvider>
            <ThemeProvider>
              <Routes />
            </ThemeProvider>
          </TransactionProvider>
        </AuthProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
