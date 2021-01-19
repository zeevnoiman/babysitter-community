import React, { createContext, useState, useEffect, useContext } from "react";
import api from '../services/api';

export const babysitterContext = createContext();

const BabysitterProvider = ({children}) => {
    const [babysitter, setBabysitter] = useState(null);
    const [babysitterLoading, setbabysitterLoading] = useState(true);
    
    const tryToGetBabysitter = async(user) => {
        console.log("try to get babysitter");
        const res = await api.get('/babysitter',{
            headers:
            {
                user_id : user.id
            }
        });
        console.log(res.data);
        if(res.data){
            setBabysitter(res.data)
        }
        setbabysitterLoading(false);
    }
    
    const saveBabysitter = async (data, user_id) => {
        console.log(user_id);
        const response = await api.post('/babysitter', data)
        const res = await api.get('/babysitter',{
            headers:
            {
                user_id: user_id
            }
        });
        if(res){
            setBabysitter(res.data)
        }
    }

    const updateBabysitter = async (data, user_id, babysitter_id) => {
        console.log(user_id);
        const response = await api.post(`/babysitter/${babysitter_id}`, data)
        const res = await api.get('/babysitter',{
            headers:
            {
                user_id: user_id
            }
        });
        if(res.data){
            setBabysitter(res.data)
            return true;
        } else{
            return false
        }
    }
    return (
        <babysitterContext.Provider value={
           {
            babysitterLoading,
            babysitter,
            tryToGetBabysitter,
            saveBabysitter,
            updateBabysitter
            }
        }>
            {children}
        </babysitterContext.Provider>
    )
};

export default BabysitterProvider;