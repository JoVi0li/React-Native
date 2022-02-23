import React from 'react';
import { StatusBar } from 'react-native';
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { ThemeProvider } from 'styled-components/native';
import theme from "./src/global/styles/theme";
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from "@react-navigation/native"

import AppRoutes from './src/Routes/app.routes';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle={"light-content"} />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}


