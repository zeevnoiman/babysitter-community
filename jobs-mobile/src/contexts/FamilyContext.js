import React, { createContext, useState, useEffect } from "react";
import api from '../services/api';

export const familyContext = createContext();

const FamilyProvider = ({children}) => {

    const [likedBabysitters, setLikedBabysitters] = useState({});

    const searchBabysitters = async (latitude, longitude) => {
        
        const response = await api.get('/search',{
            params: {
                latitude,
                longitude,
            }
        } );
        return response.data.babySitters;
    }

    const getLikedBabysitters = async (user_id) => {
        try{
            const res = await api.get('/like',
            {
                headers:{
                    user_id : user_id,
                }
            });
            console.log(res.data);
            setLikedBabysitters(res.data.likedBabysitters);
            return res.data.likedBabysitters  
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

    const addLikedBabysitter = async  (babysitter_id, user_id) => { 
        try{
            const res = await api.post(`/like/${babysitter_id}`,{},
            {
                headers:{
                    user_id : user_id,
                }
            });
            await getLikedBabysitters(user_id)
            console.log(res.data);
            return res.data.isAdded    
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

    const deleteLikedBabysitter = async  (babysitter_id, user_id) => {
        console.log(babysitter_id, user_id)
        try{
        const res = await api.post(`/dislike/${babysitter_id}`,{}, {
            headers:{
                user_id: user_id,
            }
        });
        await getLikedBabysitters(user_id);
        return res.data
        }
        catch(err){
            console.log(err);
            return false
        }
    }

    const searchFilterBabysitter = async ({babysitter_name, city, schedule, range, criterias}) => {
        console.log('filter')
        try{
            const res = await api.get('/filter', {
                params:{
                    babysitter_name,
                    city,
                    schedule,
                    range,
                    criterias
                }
            });

            return res.data
        } catch(err){
            console.log(err);
        }
    }

    return (
        <familyContext.Provider value={
           {
            likedBabysitters,
            searchBabysitters,
            getLikedBabysitters,
            addLikedBabysitter,
            deleteLikedBabysitter,
            searchFilterBabysitter
            }
        }>
            {children}
        </familyContext.Provider>
    )
};

export default FamilyProvider;