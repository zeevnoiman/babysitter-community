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
    
    useEffect(async () => {
        const res = await api.get(`/babysitter/${user.id}`);
        setBabysitter(res.data)
    })
    
    return (
        <babysitterContext.Provider value={
           {
            }
        }>
            {children}
        </babysitterContext.Provider>
    )
};

export default BabysitterProvider;