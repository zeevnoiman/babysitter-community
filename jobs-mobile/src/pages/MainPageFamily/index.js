import React, {useContext, useEffect, useState} from 'react';
import { Text, TouchableOpacity, View, Vibration, AsyncStorage } from 'react-native';
import { Notifications } from 'expo-notifications';

import styles from './styles';
import { userContext } from '../../contexts/UserContext';


export default function MainPageFamily({navigation}){

    const {user, logOut} = useContext(userContext);
    const [welcomePhrase, setWelcomePhrase] = useState('Welcome');

    useEffect(() => {
        const hourNow = new Date().getHours();
        if(hourNow > 5 && hourNow < 12){
            setWelcomePhrase('Good morning')
        } else if(hourNow >= 12 && hourNow < 17){
            setWelcomePhrase('Good afternoon')
        } else if(hourNow >= 17 && hourNow < 20){
            setWelcomePhrase('Good evening')
        } else{
            setWelcomePhrase('Good night')
        }

    }, [])
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
        <View style={styles.container}>
            <Text>{welcomePhrase} {user.name}</Text>
            <View style={styles.firstLine}>
                <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                    <Text>Go to map</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LikedNannies')}>
                    <Text>Go to my favorites</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.secondLine}>
                <TouchableOpacity onPress={() => navigation.navigate('Works')}>
                    <Text>All my works</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SearchBabysitters')}>
                    <Text>Search Nannies</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLogout}>
                 <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}