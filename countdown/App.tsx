import React from 'react';
import { Home } from './src/pages/home';
import AppLoading from 'expo-app-loading';

import theme from './src/styles/theme';

import {
  useFonts,
  RedHatText_700Bold
} from "@expo-google-fonts/red-hat-text"
import { ThemeProvider } from 'styled-components';
import { SafeAreaView } from 'react-native';

export default function App() {
  const [fontLoaded] = useFonts({
    RedHatText_700Bold
  });

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </ThemeProvider>
  )
}
