import React, { createContext, useState } from "react";
import axios from 'axios';
import api from '../services/api';
import {parse} from 'date-fns'

export const workContext = createContext();

const WorkProvider = ({children}) => {

    const [works, setWorks] = useState([]);
    
    const loadWorks = async () => {
        console.log('loadworks function',token);
        
        const response = await api.get('/work', {
            headers:{
                authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin' : '*',
                user_id : user.id,
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


    return (
        <workContext.Provider value={
           { 
            works,
            setWorks,
            loadWorks,
            addWork,
            }
        }>
            {children}
        </workContext.Provider>
    )
};

export default WorkProvider;