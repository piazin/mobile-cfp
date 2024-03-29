import React, { useContext, useState, useEffect } from 'react';
import AppRoutes from './app/app.routes';
import AuthRoutes from '../routes/auth/auth.routes';

import {
  useFonts,
  Inter_900Black,
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular,
} from '@expo-google-fonts/inter';

import { AuthContext } from '../contexts/authContext';

import { Loading } from '../components/Loading';

export default function Routes() {
  const { signed } = useContext(AuthContext);

  const [fontLoad, setFontLoad] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  });

  useEffect(() => {
    setFontLoad(fontsLoaded);
  }, [fontsLoaded]);

  if (!fontLoad) return <Loading />;

  return <>{signed ? <AppRoutes /> : <AuthRoutes />}</>;
}
