import React, { useContext } from 'react';
import { babysitterContext } from '../../contexts/BabysitterContext';
import { userContext } from '../../contexts/UserContext';


import SavedNannyProfile from '../SavedNannyProfile';
import EditNannyProfile  from '../EditNannyProfile ';


const MainPageBabysitter = () =>{
    const {babysitter, loading} = useContext(babysitterContext);
    const {user} = useContext(userContext);

    if(loading){
        return(
            <Text>Hello {user.name}</Text>
        )
    }
    return(
        babysitter ? <SavedNannyProfile/> : <EditNannyProfile/>
    )
}

export default MainPageBabysitter;