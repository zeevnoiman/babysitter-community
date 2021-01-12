import React, {useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, AsyncStorage} from 'react-native';

import api from '../../services/api'
import styles from './styles';
import background from '../../assets/background.png';
import { userContext } from '../../contexts/UserContext';




export default function Splash({navigation}){
    return (
    <ImageBackground source={background} style={{flex:1}}/>
    )
}