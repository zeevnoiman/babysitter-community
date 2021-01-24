import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Map from '../pages/Map';
import LikedNannies from '../pages/LikedNannies';
import MainPageFamily from '../pages/MainPageFamily';
import Works from '../pages/Works';
import OpenWorks from '../pages/OpenWorks';
import PastWorks from '../pages/PastWorks';
import NannyReviews from '../pages/NannyReviews';
import SavedNannyProfile from '../pages/SavedNannyProfile';
import SearchBabysitters from '../pages/SearchBabysitters';

import FamilyProvider from '../contexts/FamilyContext';
import WorkProvider from '../contexts/WorkContext';
import BabysitterProvider from '../contexts/BabysitterContext';

const FamilyStack = createStackNavigator();

const FamilyRoutes = () => (
    <FamilyProvider>
        <WorkProvider>
            <BabysitterProvider>
                <FamilyStack.Navigator>
                    <FamilyStack.Screen name='MainPageFamily' component={MainPageFamily} />
                    <FamilyStack.Screen name='SearchBabysitters' component={SearchBabysitters} />
                    <FamilyStack.Screen name='Map' component={Map} />
                    <FamilyStack.Screen name='LikedNannies' component={LikedNannies} />
                    <FamilyStack.Screen name='Works' component={Works} />
                    <FamilyStack.Screen name='OpenWorks' component={OpenWorks} />
                    <FamilyStack.Screen name='PastWorks' component={PastWorks} />
                    <FamilyStack.Screen name='NannyReviews' component={NannyReviews} />
                    <FamilyStack.Screen name='SavedNannyProfile' component={SavedNannyProfile} />
                </FamilyStack.Navigator>
            </BabysitterProvider>
        </WorkProvider>
    </FamilyProvider>
)


export default FamilyRoutes;