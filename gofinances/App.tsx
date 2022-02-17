import React from 'react';
import Dashboard from './src/screens/Dashboard';
import Register from './src/screens/Register';
import CategorySelect from './src/screens/CategorySelect';
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
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}


