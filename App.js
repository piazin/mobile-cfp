import { LogBox } from 'react-native';
import React, { useState, useEffect } from 'react';
import Routes from './src/routes/index.routes';
import { QueryClient, QueryClientProvider } from 'react-query';

import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Inter_900Black,
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular,
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';

import ThemeProvider from './src/contexts/themeContext';
import AuthProvider from './src/contexts/authContext';
import TransactionProvider from './src/contexts/transactionsContext';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { theme } from './src/styles/styles';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme}>
          <AuthProvider>
            <TransactionProvider>
              <ThemeProvider>
                <Routes />
              </ThemeProvider>
            </TransactionProvider>
          </AuthProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
