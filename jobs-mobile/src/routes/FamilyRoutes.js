import React, {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native'
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
import UserProfilePage from '../pages/UserProfilePage';

import FamilyProvider from '../contexts/FamilyContext';
import WorkProvider from '../contexts/WorkContext';
import BabysitterProvider from '../contexts/BabysitterContext';
import { userContext } from '../contexts/UserContext';

const FamilyStack = createStackNavigator();

const FamilyRoutes = () => {
    const {logOut} = useContext(userContext)

    return(
    <FamilyProvider>
            <WorkProvider>
                <BabysitterProvider>
                    <FamilyStack.Navigator screenOptions={{
                        headerStyle: {
                            backgroundColor: '#f0f0f0',
                            },
                        headerTintColor: '#759d81',
                        headerTitleAlign: 'center',
                    }}>
                        <FamilyStack.Screen name='MainPageFamily' component={MainPageFamily} options = {{
                            title: 'My home',
                            headerShown: false,
                            headerStyle: {
                            backgroundColor: '#fff',
                            },
                            headerTintColor: '#759d81',
                            headerTitleStyle: {
                            fontWeight: 'bold',
                            },
                            headerTitleAlign: 'center',
                            headerLeft : null,
                            }}/>
                        <FamilyStack.Screen name='SearchBabysitters' component={SearchBabysitters} 
                        options={{ headerTitle : 'Filter'}}/>
                        <FamilyStack.Screen name='Map' component={Map} 
                        options={{ headerTitle : 'Browse'}}/>
                        <FamilyStack.Screen name='LikedNannies' component={LikedNannies} 
                        options={{ headerTitle : 'Favorites'}}/>
                        <FamilyStack.Screen name='Works' component={Works} 
                        options={{ headerTitle : 'Bookings'}}/>
                        <FamilyStack.Screen name='OpenWorks' component={OpenWorks} />
                        <FamilyStack.Screen name='PastWorks' component={PastWorks} />
                        <FamilyStack.Screen name='NannyReviews' component={NannyReviews} 
                        options={{ headerTitle : 'Reviews'}}/>
                        <FamilyStack.Screen name='SavedNannyProfile' component={SavedNannyProfile}
                        options={{ headerTitle : ''}} />
                        <FamilyStack.Screen name='UserProfile' component={UserProfilePage}
                        options={{ headerTitle : 'Profile',
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
                        )}} />
                    </FamilyStack.Navigator>
                </BabysitterProvider>
            </WorkProvider>
        </FamilyProvider>
    )
}



export default FamilyRoutes;