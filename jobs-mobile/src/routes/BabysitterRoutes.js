import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import Splash from '../pages/Splash';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Signin from '../pages/Signin';


const AuthRoutes = createAppContainer(
    createStackNavigator({
        EditNannyProfile: {
            screen: EditNannyProfile,
            navigationOptions: {
                title: 'Profile',
            },
        },
    })
)


export default AuthRoutes;