import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import 'intl';
import 'intl/locale-data/jsonp/he-IL'
import { useFonts } from 'expo-font';

import Routes from './src/routes';
import Splash from './src/pages/Splash';
import UserProvider from './src/contexts/UserContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'mama': require('./src/assets/fonts/mama.otf'),
    'Montserrat': require('./src/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('./src/assets/fonts/Montserrat-Medium.ttf'),

  });

  if(!fontsLoaded){
    return <Splash/>
  }
  return (
    <NavigationContainer>
      <UserProvider>
        <Routes/>
      </UserProvider>
    </NavigationContainer>
  );
  
}