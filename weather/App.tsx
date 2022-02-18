import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';
import theme from './src/global/styles/theme';
import {
  useFonts,
  Overpass_400Regular,
  Overpass_700Bold,
  Overpass_900Black
} from "@expo-google-fonts/overpass"
import { AppRoutes } from './src/routes/app.routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Overpass_400Regular,
    Overpass_700Bold,
    Overpass_900Black
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes/>
      </NavigationContainer>
    </ThemeProvider>
  );
}
