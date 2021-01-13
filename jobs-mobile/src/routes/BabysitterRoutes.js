import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditNannyProfile from '../pages/EditNannyProfile';
import SavedNannyProfile from '../pages/SavedNannyProfile';
import BabysitterProvider from '../contexts/BabysitterContext';

const BabysitterStack = createStackNavigator();

const BabysitterRoutes = () => {
    <BabysitterProvider>
        <BabysitterStack.Navigator>
            <BabysitterStack.Screen name='EditNannyProfile' component={EditNannyProfile} />
            <FamilyStack.Screen name='SavedNannyProfile' component={SavedNannyProfile} />
        </BabysitterStack.Navigator>
    </BabysitterProvider>
}


export default BabysitterRoutes;