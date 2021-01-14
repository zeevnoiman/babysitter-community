import React, {useContext} from 'react';

import FamilyRoutes from './FamilyRoutes';
import BabysitterRoutes from './BabysitterRoutes';
import { userContext } from '../contexts/UserContext';

const AppRoutes = () => {
    const {user} = useContext(userContext);

    return user.role == 'Family' ? <FamilyRoutes/> : <BabysitterRoutes/>
}

export default AppRoutes;