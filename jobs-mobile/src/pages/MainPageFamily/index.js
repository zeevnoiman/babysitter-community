import React, {useContext, useEffect} from 'react';
import { Text, TouchableOpacity, View, Vibration, AsyncStorage } from 'react-native';
import { Notifications } from 'expo-notifications';

import styles from './styles';
import { userContext } from '../../contexts/UserContext';


export default function MainPageFamily({navigation}){

    const {user, logOut} = useContext(userContext);
    async function handleLogout(){
       logOut()
    }

//     const _handleNotification = notification => {
//      Vibration.vibrate();
//      console.log(notification);
//      if(notification.origin == 'selected'){
//           navigation.navigate('PastWorks')
//      }
//    }

//    useEffect(() => {
//      // Handle notifications that are received or selected while the app
//      // is open. If the app was closed and then opened by tapping the
//      // notification (rather than just tapping the app icon to open it),
//      // this function will fire on the next tick after the app starts
//      // with the notification data.
//      if(!user){
//           tryGetUser();
//      }
//      _notificationSubscription = Notifications.addListener(_handleNotification);
//    }, []);

    return(
        <View>
            <Text>This is the main page</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                <Text>Go to map</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LikedNannies')}>
                 <Text>Go to my favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Works')}>
                 <Text>All my works</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SearchBabysitters')}>
                 <Text>Search Nannies</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('SearchBabysitters')}>
                 <Text>Create an alert to Nannies search you</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={handleLogout}>
                 <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}