import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import Splash from '../pages/Splash';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Signin from '../pages/Signin';


const AuthRoutes = createAppContainer(
    createStackNavigator({
        SplashScreen: {
            screen: Splash,
            navigationOptions: {
                title: 'Super Nanny',
                headerShown: false
            }
        },
        Welcome: {
            screen: Welcome,
            navigationOptions: {
                title: 'Super Nanny',
                headerShown: false
            }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Login',
            }
        },
        Signin: {
            screen: Signin,
            navigationOptions: {
                title: 'Sign In',
            },
        }
    })
)


export default AuthRoutes;