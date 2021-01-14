import React, {useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, AsyncStorage} from 'react-native';
import api from '../../services/api'

import styles from './styles';
import background from '../../assets/background.png';
import { userContext } from '../../contexts/UserContext';

export default function Welcome({navigation}){

    function navigateToLogin(role){
        navigation.navigate('Login', {'role' : role});
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={background} style={{flex:1}}>
            <View style={styles.welcomeBox}>
                <Text style={styles.welcomeTitle}>Welcome to our community!</Text> 
            </View>
            <View style={styles.actions}>
                    <Text style={ styles.questionToAction}>Are you a Family or a Nanny?</Text>
                    <View style={styles.loginBox}>
                    <TouchableOpacity style={styles.action} onPress={() => navigateToLogin('Family')}>
                        <Text style={styles.actionText}>Family</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => navigateToLogin('Nanny')}>
                        <Text style={styles.actionText}>Nanny</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ImageBackground>
        </View>
    )
}