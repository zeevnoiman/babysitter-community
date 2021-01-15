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
        console.log(res);
        if(res.data){
            setBabysitter(res.data)
        }
        setbabysitterLoading(false);
    }
    
    const saveBabysitter = async (data) => {
        console.log(data.user_id);
        const response = await api.post('/babysitter', data)
        const res = await api.get('/babysitter',{
            headers:
            {
                user_id : data.user_id
            }
        });
        if(res){
            setBabysitter(res.data)
        }
    }
    return (
        <babysitterContext.Provider value={
           {
            babysitterLoading,
            babysitter,
            tryToGetBabysitter,
            saveBabysitter
            }
        }>
            {children}
        </babysitterContext.Provider>
    )
};

export default BabysitterProvider;