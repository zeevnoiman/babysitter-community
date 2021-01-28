import React, {useContext, useEffect, useState, useRef} from 'react';
import { Text, TouchableOpacity, View, Vibration, AsyncStorage, SafeAreaView } from 'react-native';
import { Notifications } from 'expo-notifications';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; 
import LottieView from 'lottie-react-native';

import styles from './styles';
import { userContext } from '../../contexts/UserContext';


export default function MainPageFamily({navigation}){

    const animation = useRef(null)
    const {user} = useContext(userContext);
    const [welcomePhrase, setWelcomePhrase] = useState('Welcome');
    const [isDay, setIsDay] = useState(true);

    useEffect(() => {
        animation.current.play();
        const hourNow = new Date().getHours();
        if(hourNow > 5 && hourNow < 12){
            setWelcomePhrase('Good morning')
        } else if(hourNow >= 12 && hourNow < 17){
            setWelcomePhrase('Good afternoon')
        } else if(hourNow >= 17 && hourNow < 20){
            setIsDay(false)
            setWelcomePhrase('Good evening')
        } else{
            setIsDay(false)
            setWelcomePhrase('Good night')
        }

    }, [])

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
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <LottieView
                ref={animation}
                style={{
                    width: 400,
                    height: 400,
                   backgroundColor: '#eee',
                }}
                source={
                    // isDay ? 
                    // require('../../../assets/baby2.json')  ://not found good lottiefile compatible with expo
                     require('../../../assets/28912-baby-sleeping.json')}
                />
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{welcomePhrase}</Text>
                    <Text style={styles.title}>{user.name}</Text>
                </View>
            </View>
            <View style={styles.firstLine}>
                <TouchableOpacity style={styles.buttonv1} onPress={() => navigation.navigate('Map')}>
                    {/* <Text style={styles.text}>Map</Text> */}
                    <FontAwesome name="map-o" size={28} color="#d16088" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonv1} onPress={() => navigation.navigate('LikedNannies')}>
                    <FontAwesome name="heart" size={28} color="#d16088" />
                    {/* <Text style={styles.text}>Favorites</Text> */}
                </TouchableOpacity>
            {/* </View> */}
            {/* <View style={styles.secondLine}> */}
                <TouchableOpacity style={styles.buttonv1} onPress={() => navigation.navigate('Works')}>
                    {/* <Text style={styles.text}>Bookings</Text> */}
                    <FontAwesome name="calendar" size={28} color="#d16088" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonv1} onPress={() => navigation.navigate('SearchBabysitters')}>
                    {/* <Text style={styles.text}>Search</Text> */}
                    <FontAwesome name="search" size={28} color="#d16088" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonv1} onPress={() => navigation.navigate('UserProfile')}>
                    {/* <Text style={styles.text}>Search</Text> */}
                    <Ionicons name="person-circle-outline" size={28} color="#d16088" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}