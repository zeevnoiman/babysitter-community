import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Map from '../pages/Map';
import LikedNannies from '../pages/LikedNannies';
import MainPageFamily from '../pages/MainPageFamily';
import OpenWorks from '../pages/OpenWorks';
import PastWorks from '../pages/PastWorks';
import NannyReviews from '../pages/NannyReviews';
import SavedNannyProfile from '../pages/SavedNannyProfile';

import FamilyProvider from '../contexts/FamilyContext';
import WorkProvider from '../contexts/WorkContext';

const FamilyStack = createStackNavigator();

const FamilyRoutes = () => (
    <FamilyProvider>
        <WorkProvider>
            <FamilyStack.Navigator>
                <FamilyStack.Screen name='MainPageFamily' component={MainPageFamily} />
                <FamilyStack.Screen name='Map' component={Map} />
                <FamilyStack.Screen name='LikedNannies' component={LikedNannies} />
                <FamilyStack.Screen name='OpenWorks' component={OpenWorks} />
                <FamilyStack.Screen name='PastWorks' component={PastWorks} />
                <FamilyStack.Screen name='NannyReviews' component={NannyReviews} />
                <FamilyStack.Screen name='SavedNannyProfile' component={SavedNannyProfile} />
            </FamilyStack.Navigator>
        </WorkProvider>
    </FamilyProvider>
)


export default FamilyRoutes;