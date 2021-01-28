import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { userContext } from '../../contexts/UserContext';

import styles from './styles';

export default function UserProfilePage(){

    const {user} = useContext(userContext);
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{user.name}</Text>
            <Text style={styles.text}>{user.email}</Text>
        </View>
        
    )
}