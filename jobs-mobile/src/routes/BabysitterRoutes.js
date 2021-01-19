import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import EditNannyProfile from '../pages/EditNannyProfile';
import SavedNannyProfile from '../pages/SavedNannyProfile';
import MainPageBabysitter from '../pages/MainPageBabysitter';

import BabysitterProvider from '../contexts/BabysitterContext';
import { userContext } from '../contexts/UserContext';


const BabysitterStack = createStackNavigator();

const BabysitterRoutes = () => {
    const {logOut} = useContext(userContext);

    return(
    <BabysitterProvider>
        <BabysitterStack.Navigator 
        screenOptions={{
            title: 'My home',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#759d81',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerLeft : null,
            headerRight: () => (
                <TouchableOpacity
                  onPress={() => logOut()}
                  style={
                    {
                        backgroundColor : "#f5715f",
                        padding: 5,
                        borderRadius : 8,
                        shadowOffset : 10,
                        shadowColor : '#cc2f1b',
                        shadowRadius : 8,
                        marginRight : 10
                    }}
                >
                    <Text style = {{
                        color: '#fff',
                        fontFamily: 'Montserrat'
                    }}>Log Out</Text>
                </TouchableOpacity>
            ),
        }}>
            <BabysitterStack.Screen name='MainPageBabbysitter' component={MainPageBabysitter} />
            <BabysitterStack.Screen name='EditNannyProfile' component={EditNannyProfile} />
            <BabysitterStack.Screen name='SavedNannyProfile' component={SavedNannyProfile} />
        </BabysitterStack.Navigator>
    </BabysitterProvider>
    )
}


export default BabysitterRoutes;