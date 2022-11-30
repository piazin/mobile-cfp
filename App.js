import React, { useContext, useState, useEffect } from "react";
import Routes from "./src/routes/index.routes";

import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Inter_900Black,
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { Loading } from "./src/components/Loading";

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
  const [fontLoad, setFontLoad] = useState(true);
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  });
  useEffect(() => {
    setFontLoad(fontsLoaded ? false : true);
  }, [fontsLoaded]);

  if (fontLoad) return <Loading />;

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
