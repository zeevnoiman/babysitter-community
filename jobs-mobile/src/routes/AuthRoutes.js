import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import Splash from '../pages/Splash';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Signin from '../pages/Signin';


const AuthStack = createStackNavigator();

const AuthRoutes = () => {
    <AuthStack.Navigator>
        <AuthStack.Screen name='Splash' component={Splash} />
        <AuthStack.Screen name='Welcome' component={Welcome} />
        <AuthStack.Screen name='Login' component={Login} />
        <AuthStack.Screen name='Signin' component={Signin} />
    </AuthStack.Navigator>
}

export default AuthRoutes;