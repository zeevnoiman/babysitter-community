import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import EditNannyProfile from '../pages/EditNannyProfile';

const BabysitterStack = createStackNavigator();

const BabysitterRoutes = () => {
    <BabysitterStack.Navigator>
        <BabysitterStack.Screen name='EditNannyProfile' component={EditNannyProfile} />
    </BabysitterStack.Navigator>
}


export default BabysitterRoutes;