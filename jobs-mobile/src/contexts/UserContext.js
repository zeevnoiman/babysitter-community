import React, { createContext, useState, useEffect } from "react";
import {AsyncStorage} from 'react-native';
import api from '../services/api';
import {parse} from 'date-fns'

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

    const addLikedBabysitter = async  (babysitter) => {

        console.log(babysitter);
        
        const newLikedBabysitters = [...user.likedBabysitters, babysitter.id];
         
        setUser({...user, likedBabysitters : newLikedBabysitters});

        console.log(token);
        
        try{
        const res = await api.put(`/like/${babysitter._id}`, babysitter,
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