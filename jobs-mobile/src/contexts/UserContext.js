import React, { createContext, useState, useEffect } from "react";
import {AsyncStorage, Platform} from 'react-native';
import { Notifications } from 'expo-notifications';
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
            console.log("try to get user");
            // await AsyncStorage.removeItem('BS:User');
            // await AsyncStorage.removeItem('BS:Token');
            const user = await AsyncStorage.getItem('BS:User');
            const token = await AsyncStorage.getItem('BS:Token');
            if(!user || !token){
                setLoading(false);
                return false;
            }
            try{
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
                const {data : user_from_api} = await api.get('/user',{
                    headers:{
                        user_id: JSON.parse(user).id
                    }
                });
                if(!user_from_api){
                    setUser(false)
                    setLoading(false)
                    return;
                }
                setUser(user_from_api);
                setToken(token);                                                 
                setLoading(false);
            } catch(err){
                console.log(err);
            }
        };
        
        tryGetUser();
    }, [])

    const registerForPushNotificationsAsync = async () => {
        let token;
        console.log('register function');
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            console.log(existingStatus);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }

        return token;
    }

    const signin = async ({email, name, password, role}) => {
        console.log('signin');
        const response =await api.post('/signin',
            {
               email,
               name,
               password,
               role,
               expoPushToken
            });
        console.log(response.data);
        const createdUser = {
            email, 
            name, 
            role,
            id : response.data.id,
            expoPushToken
        }
        console.log(createdUser);
        await AsyncStorage.removeItem('BS:User');
        await AsyncStorage.removeItem('BS:Token');
        await AsyncStorage.setItem('BS:User', JSON.stringify(createdUser));
        await AsyncStorage.setItem('BS:Token',JSON.stringify(response.data.token));
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        setUser(createdUser);
        setToken(response.data.token);
                  
    }

    const login = async (email, password, role) => {
        const res = await api.post('/login',
            {
                email,
                password,
            }
        );
        
        if(res.data.role != role){
            throw(`You are not registered as ${role}, please enter with your correct user`);
        }
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        console.log(api.defaults.headers);
        await AsyncStorage.removeItem('BS:User');
        await AsyncStorage.removeItem('BS:Token');
        await AsyncStorage.setItem('BS:User', JSON.stringify(res.data));
        await AsyncStorage.setItem('BS:Token', JSON.stringify(res.data.token));
        setToken(res.data.token);
        setUser(res.data);
    }

    const logOut = async () =>  {
        await AsyncStorage.removeItem('BS:User');
        await AsyncStorage.removeItem('BS:Token');
        setToken(null);
        setUser(null);
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
            logOut,
            expoPushToken,
            setExpoPushToken
            }
        }>
            {children}
        </userContext.Provider>
    )
};

export default UserProvider;