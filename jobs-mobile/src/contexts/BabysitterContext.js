import React, { createContext, useState, useEffect, useContext } from "react";
import {parse} from 'date-fns'
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

    const getSchedules = async (babysitter_id) => {

        const response = await api.get(`/schedules/${babysitter_id}`)
        const schedules = response.data;
        const newSchedules = schedules.map((schedule) => {
            var dateHourStartDateFormat = new Date(); 
            var dateHourFinishDateFormat = new Date();
            if(schedule.dateHourStartReadable.length > 0 ){ 
                
                dateHourStartDateFormat = parse(schedule.dateHourStartReadable, 'dd/MM/yyyy HH:mm:ss', new Date());
                dateHourFinishDateFormat = parse(schedule.dateHourFinishReadable, 'dd/MM/yyyy HH:mm:ss', new Date());
            }    
            
            const newSchedule =  {...schedule, dateHourStartDateFormat, dateHourFinishDateFormat}
            return newSchedule           
        })
        console.log('-----schedules-----')
        console.log(newSchedules);
        return newSchedules
    }
    return (
        <babysitterContext.Provider value={
           {
            babysitterLoading,
            babysitter: babysitter,
            tryToGetBabysitter,
            saveBabysitter,
            updateBabysitter,
            getSchedules
            }
        }>
            {children}
        </babysitterContext.Provider>
    )
};

export default BabysitterProvider;