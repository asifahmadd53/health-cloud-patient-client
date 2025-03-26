import { StatusBar} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLayout from './navigation';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';


const RootLayout = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
      <PaperProvider>


      <AppLayout/>


      
      </PaperProvider>
     </NavigationContainer>
      </>
  );
};

export default RootLayout;

