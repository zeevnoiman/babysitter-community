import React, {useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import api from '../../services/api';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import styles from './styles';
import { userContext } from '../../contexts/UserContext';


export default function Signin({navigation}){
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    
    const {setUser, setToken, expoPushToken, setExpoPushToken} = useContext(userContext);

    
    const role = navigation.getParam('role');
    

    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = await Notifications.getExpoPushTokenAsync();
          console.log(token);
          setExpoPushToken( token );
        } else {
          alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
          Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
          });
        }

        return token;
      }
        
    

    async function handlePressSignIn(){
        try {
            const expoPushToken = await registerForPushNotificationsAsync();    
           
            const response =await api.post('/signin',
            {
               email,
               name,
               password,
               role,
               expoPushToken
            });

            if(role == 'Family'){
                setUser(response.data.user);
                setToken(response.data.token);
                navigation.navigate('Map');
            }
            else if(role == 'Nanny'){
                console.log(response.data);
                setUser(response.data.user);
                setToken(response.data.token);
                navigation.navigate('EditNannyProfile');
            }    
        } catch (error) {
            console.log(error);
        }
        

    }

    function confirmPassword(text){
        setMessage('');
        setSecondPassword(text);
        if(text != password && text != ''){
            setMessage('Passwords do not match');
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.form}>
            <TextInput 
                style={styles.textInput}
                placeholder= 'Your email'
                placeholderTextColor='#999' 
                autoCapitalize='none'
                autoCorrect={false}
                value={email}
                onChangeText={text=>setEmail(text)}/>


            <TextInput 
                style={styles.textInput}
                placeholder= 'Your Name'
                placeholderTextColor='#999' 
                autoCapitalize='words'
                autoCorrect={false}
                value={name}
                onChangeText={text=>setName(text)}/>


            <TextInput 
                style={styles.textInput}
                placeholder= 'Your password'
                placeholderTextColor='#999' 
                autoCapitalize='none'
                secureTextEntry = {true}
                autoCorrect={false}
                value={password}
                onChangeText={text=>setPassword(text)}/>

            <TextInput 
                style={styles.textInput}
                placeholder= 'Confirm password'
                placeholderTextColor='#999' 
                autoCapitalize='none'
                secureTextEntry = {true}
                autoCorrect={false}
                value={secondPassword}
                onChangeText={text=>confirmPassword(text)}/>
            {message.length > 0 &&
                <Text style={styles.messageText}>{message}</Text>
            }
             </View>
             <TouchableOpacity style={styles.action} onPress={handlePressSignIn}>
                <Text style={styles.actionText}>Sign in</Text>
             </TouchableOpacity>
    </View>
    )
}