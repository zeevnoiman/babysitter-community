import React, { createContext, useState, useEffect } from "react";
import {AsyncStorage, Platform} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import api from '../services/api';

export const userContext = createContext();

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const [expoPushToken, setExpoPushToken] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function tryGetUser(){
            console.log('try to get user');
            
            const user = await AsyncStorage.getItem('User');
            const token = await AsyncStorage.getItem('Token');
            if(!user || !token){
                setLoading(false);
                return false;
            }

            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`; 
            const {data : user_from_api} = await api.get('user',{
                headers:{
                    user_id: JSON.parse(user).id
                }
            });
            setUser(user_from_api);
            setToken(token);                                                 
            setLoading(false);
        };
        
        tryGetUser();
    })

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

    const signin = async ({email, name, password, role}) => {
        const response =await api.post('/signin',
            {
               email,
               name,
               password,
               role,
               expoPushToken
            });
        await AsyncStorage.removeItem('User');
        await AsyncStorage.removeItem('Token');
        await AsyncStorage.setItem('User', JSON.stringify({
            "id": response.data.id,
            "name": name,
            "email": email,
            "role": role,
            "expoPushToken": expoPushToken,
          }));
        await AsyncStorage.setItem('Token', JSON.stringify(response.data.token));
        api.defaults.headers.Authorization = `Bearer ${JSON.stringify(res.data.token)}`;
        setUser(response.data.user);
        setToken(response.data.token);
                  
    }

    const login = async (email, password, role) => {
        
        const res = await api.post('/login',
            {
                email,
                password,
            }
        );
        
        if(res.data.user.role != role){
            throw(`You are not registered as ${role}, please enter with your correct user`);
        }
        await AsyncStorage.removeItem('User');
        await AsyncStorage.removeItem('Token');
        await AsyncStorage.setItem('User', JSON.stringify(res.data.user));
        await AsyncStorage.setItem('Token', JSON.stringify(res.data.token));
        api.defaults.headers.Authorization = `Bearer ${JSON.stringify(res.data.token)}`; 
        setToken(res.data.token);
        setUser(res.data.user);
    }
    

    const addLikedBabysitter = async  (babysitter) => {

        console.log(babysitter);
        
        const newLikedBabysitters = [...user.likedBabysitters, babysitter.id];
         
        setUser({...user, likedBabysitters : newLikedBabysitters});

        console.log(token);
        
        try{
        const res = await api.put(`/like/${babysitter.id}`, babysitter,
        {
            headers:{
                'Access-Control-Allow-Origin' : '*',
                user_id : user.id,
            }
        });
        console.log(res.data);
        
        }
        catch(err){
            console.log(err);
        }
    }

    const deleteLikedBabysitter = async  (babysitter) => {
        const newLikedBabysitters = 
        user.likedBabysitters.filter(babysitterToverify =>
                                     babysitterToverify != babysitter.id)
                       
        setUser({...user, likedBabysitters : newLikedBabysitters});
                       
        try{
        const res = await api.delete(`/like/${babysitter.id}`,{
            headers:{
                user_id: user.id,
            }
        });
        console.log(res.data);
        return 'Babysitter desliked'
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <userContext.Provider value={
           {
            loading,
            signed : !!user,
            setUser,
            user,
            setToken,
            token,
            registerForPushNotificationsAsync,
            signin,
            login,
            addLikedBabysitter,
            deleteLikedBabysitter,
            expoPushToken,
            setExpoPushToken
            }
        }>
            {children}
        </userContext.Provider>
    )
};

export default UserProvider;