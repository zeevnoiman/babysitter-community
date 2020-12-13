import React, { createContext, useState } from "react";
import axios from 'axios';
import api from './services/api';
import {parse} from 'date-fns'

export const userContext = createContext();

const UserProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [works, setWorks] = useState([]);
    const [expoPushToken, setExpoPushToken] = useState();

    const loadWorks = async () => {
        console.log('loadworks function',token);
        
        const response = await api.get('/work', {
            headers:{
                authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin' : '*',
                user_id : user._id,
            }
   
        });
        const works = response.data;

        console.log(works);
        
        const newWorks = works.map((work) => {
            var dateHourStartDateFormat = new Date(); 
            var dateHourFinishDateFormat = new Date();
            if(work.dateHourStartReadable.length > 0 ){ 
                
                dateHourStartDateFormat = parse(work.dateHourStartReadable, 'dd/MM/yyyy HH:mm:ss', new Date());
                dateHourFinishDateFormat = parse(work.dateHourFinishReadable, 'dd/MM/yyyy HH:mm:ss', new Date());
            }    
            
            const newWork =  {...work, dateHourStartDateFormat, dateHourFinishDateFormat}
            return newWork           
        })
        
        setWorks(newWorks);
    };

    async function addWork(work, babysitter_id) {
        try{
        const response = await api.post(`/work/${babysitter_id}`, work, {
            headers:{
                authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin' : '*',
                user_id : user._id,
            }
        });
        console.log(response.data);
        setWorks([...works, response.data]);
        return 'Success! The visit was scheduled.';

        } catch(err){
            console.log(err)

            return 'Error, try again...';
        }

        

    };

    const addLikedBabysitter = async  (babysitter) => {

        console.log(babysitter);
        
        const newLikedBabysitters = [...user.likedBabysitters, babysitter._id];
         
        setUser({...user, likedBabysitters : newLikedBabysitters});

        console.log(token);
        
        try{
        const res = await api.put(`/like/${babysitter._id}`, babysitter,
        {
            headers:{
                authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin' : '*',
                user_id : user._id,
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
                                     babysitterToverify != babysitter._id)
                       
        setUser({...user, likedBabysitters : newLikedBabysitters});
                       
        try{
        const res = await api.delete(`/like/${babysitter._id}`,{
            headers:{
                user_id: user._id,
                authorization: `Bearer ${token}`
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
            setUser,
            user,
            setToken,
            token,
            addLikedBabysitter,
            deleteLikedBabysitter,
            works,
            setWorks,
            loadWorks,
            addWork,
            expoPushToken,
            setExpoPushToken
            }
        }>
            {children}
        </userContext.Provider>
    )
};

export default UserProvider;