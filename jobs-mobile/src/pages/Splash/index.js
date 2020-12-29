import React, {useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, AsyncStorage} from 'react-native';

import api from '../../services/api'
import styles from './styles';
import background from '../../assets/background.png';
import { userContext } from '../../context';




export default function Splash({navigation}){
    const {setUser, setToken} = useContext(userContext);
    useEffect(() => {
        tryGetUser();
    }, []);

    async function tryGetUser(){
        try{
        console.log('try to get user');
        
        const user = await AsyncStorage.getItem('User', (err, user) => 
        {
            if(err){
                console.log(err);
                return;
            }
            console.log(JSON.parse(user));
            setUser(JSON.parse(user));
        });
        const token = await AsyncStorage.getItem('Token', (err, token) => 
        {
            if(err){
                console.log(err);
                return;
            }
            console.log(JSON.parse(token));
            setToken(JSON.parse(token));
        });
        await api.get('user',{
            headers:{
                authorization: `Bearer ${JSON.parse(token)}`,
                user_id: JSON.parse(user)._id
            }
        });                                                    
        navigation.navigate('MainPageFamily', {'role' : user.role})                                          
        }
        catch(err){
            console.log('There is no user saved');
            
        }
    };

    return (
    <ImageBackground source={background} style={{flex:1}}/>
    )