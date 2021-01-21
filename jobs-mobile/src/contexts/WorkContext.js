import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import api from '../services/api';
import {parse} from 'date-fns'

export const workContext = createContext();

const WorkProvider = ({children}) => {

    const [works, setWorks] = useState([]);

    useEffect(() => {
        loadWorks()
    }, []);

    const loadWorks = async () => {
        console.log('loadworks function');
        
        const response = await api.get('/work');

        const works = response.data;

        console.log('works from db :', works);
        
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
        return newWorks;
    };

    async function addWork(work, babysitter_id, user_id) {
        console.log(babysitter_id);
        try{
        const response = await api.post(`/work/${babysitter_id}`, work, {
            headers:{
                user_id : user_id,
            }
        });
        console.log(response.data);
        loadWorks();
        return 'Success! The visit was scheduled.';

        } catch(err){
            console.log(err)

            return 'Error, be sure the babysitter has this hour on the schedule...';
        }

        

    };


    return (
        <workContext.Provider value={
           { 
            works,
            loadWorks,
            addWork,
            }
        }>
            {children}
        </workContext.Provider>
    )
};

export default WorkProvider;