import React, { useContext, useEffect } from 'react';
import {Text} from 'react-native';
import { babysitterContext } from '../../contexts/BabysitterContext';
import { userContext } from '../../contexts/UserContext';


import SavedNannyProfile from '../SavedNannyProfile';
import EditNannyProfile  from '../EditNannyProfile';


const MainPageBabysitter = () =>{
    const {babysitterLoading, babysitter, tryToGetBabysitter} = useContext(babysitterContext);
    const {user} = useContext(userContext);

    useEffect( () => {
        tryToGetBabysitter(user)
    })
    
    if(babysitterLoading){
        return(
            <Text>Hello {user.name}</Text>
        )
    }
    return(
        babysitter ? <SavedNannyProfile/> : <EditNannyProfile/>
    )
}

export default MainPageBabysitter;