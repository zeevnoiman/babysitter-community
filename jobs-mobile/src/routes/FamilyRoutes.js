import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Map from '../pages/Map';
import LikedNannies from '../pages/LikedNannies';
import MainPageFamily from '../pages/MainPageFamily';
import OpenWorks from '../pages/OpenWorks';
import PastWorks from '../pages/PastWorks';
import NannyReviews from '../pages/NannyReviews';
import SavedNannyProfile from '../pages/SavedNannyProfile';


const FamilyStack = createStackNavigator();

const FamilyRoutes = () => {
    <FamilyStack.Navigator>
        <FamilyStack.Screen name='Map' component={Map} />
        <FamilyStack.Screen name='LikedNannies' component={LikedNannies} />
        <FamilyStack.Screen name='MainPageFamily' component={MainPageFamily} />
        <FamilyStack.Screen name='OpenWorks' component={OpenWorks} />
        <FamilyStack.Screen name='PastWorks' component={PastWorks} />
        <FamilyStack.Screen name='NannyReviews' component={NannyReviews} />
        <FamilyStack.Screen name='SavedNannyProfile' component={SavedNannyProfile} />
    </FamilyStack.Navigator>
}


export default FamilyRoutes;