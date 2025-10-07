import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLayout from './navigation';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from '@rneui/themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const RootLayout = () => {
  return (
    <>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <NavigationContainer>
        <ThemeProvider>
          <PaperProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
            <AppLayout />
            </GestureHandlerRootView>
          </PaperProvider>
        </ThemeProvider>

      </NavigationContainer>
    </>
  );
};

export default RootLayout;

