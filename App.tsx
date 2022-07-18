import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";

import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";

import * as Font from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/app.routes";
import { SignIn } from "./src/screens/SignIn";

import { AuthContextProvider } from './src/hooks/auth';

SplashScreen.preventAutoHideAsync();

export default function App(): JSX.Element {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View />;
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <AuthContextProvider>
            <SignIn />
            </AuthContextProvider>
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </View>
  );
}
