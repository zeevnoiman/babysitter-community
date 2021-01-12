import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import 'intl';
import 'intl/locale-data/jsonp/he-IL'

import Routes from './src/routes';
import { useFonts } from '@use-expo/font';
import {AppLoading} from 'expo';
import UserProvider from './src/contexts/UserContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'mama': require('./src/assets/fonts/mama.otf'),
    'Montserrat': require('./src/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('./src/assets/fonts/Montserrat-Medium.ttf'),

  });

  if(!fontsLoaded){
    return <AppLoading/>
  }
  else{
    return (
      <NavigationContainer>
        <UserProvider>
          <Routes/>
        </UserProvider>
      </NavigationContainer>
    );
  }
}


