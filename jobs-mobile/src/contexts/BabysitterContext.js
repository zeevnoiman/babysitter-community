import React, { createContext, useState, useEffect, useContext } from "react";
import {AsyncStorage, Platform} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import api from '../services/api';
import { userContext } from "./UserContext";

export const babysitterContext = createContext();

const BabysitterProvider = ({children}) => {
    const {user} = useContext(userContext)
    const [babysitter, setBabysitter] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(async () => {
        const res = await api.get(`/babysitter/${user.id}`);
        if(res){
            setBabysitter(res.data)
        }
        setTimeout(2000);
        setLoading(false);
    })
    
    const saveBabysitter = (data) => {
        const response = await api.post('/babysitter', data)
        const res = await api.get(`/babysitter/${user.id}`);
        if(res){
            setBabysitter(res.data)
        }
    }
    return (
        <babysitterContext.Provider value={
           {
            saveBabysitter
            }
        }>
            {children}
        </babysitterContext.Provider>
    )
};

export default BabysitterProvider;