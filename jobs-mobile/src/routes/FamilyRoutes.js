import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Map from '../pages/Map';
import LikedNannies from '../pages/LikedNannies';
import MainPageFamily from '../pages/MainPageFamily';
import OpenWorks from '../pages/OpenWorks';
import PastWorks from '../pages/PastWorks';
import NannyReviews from '../pages/NannyReviews';
import SavedNannyProfile from '../pages/SavedNannyProfile';


const FamilyRoutes = createAppContainer(
    createStackNavigator({
        MainPageFamily: {
            screen: MainPageFamily,
            navigationOptions: {
                title: 'Home',
                headerLeft: () => null
            },
        },
        OpenWorks: {
            screen: OpenWorks,
            navigationOptions: {
                title: 'Future Visits',
            },
        },
        PastWorks: {
            screen: PastWorks,
            navigationOptions: {
                title: 'History',
            },
        },
        NannyReviews: {
            screen: NannyReviews,
            navigationOptions: {
                title: 'Reviews',
            },
        },
        Map: {
            screen: Map,
            navigationOptions: {
                title: 'Super Nanny Map'
            }
        },
        SavedNannyProfile: {
            screen: SavedNannyProfile,
            navigationOptions: {
                title: 'Profile',
            },
        },
        LikedNannies: {
            screen: LikedNannies,
            navigationOptions: {
                title: 'Favorites',
            },
        }
    })
)


export default FamilyRoutes;