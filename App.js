import { LogBox } from 'react-native';
import React from 'react';
import Routes from './src/routes/index.routes';
import { QueryClient, QueryClientProvider } from 'react-query';

import { NativeBaseProvider } from 'native-base';

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
  return (
    <NavigationContainer theme={navTheme}>
      <NativeBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TransactionProvider>
              <ThemeProvider>
                <Routes />
              </ThemeProvider>
            </TransactionProvider>
          </AuthProvider>
        </QueryClientProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
