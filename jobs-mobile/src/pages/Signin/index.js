import React, {useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import styles from './styles';
import { userContext } from '../../contexts/UserContext';


export default function Signin({navigation}){
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    
    const {registerForPushNotificationsAsync, signin} = useContext(userContext);

    
    const role = navigation.getParam('role');
    
    async function handlePressSignIn(){
        try {
            await registerForPushNotificationsAsync();
            await signin({email, name, password, role})
        } catch (error) {
            console.log(error);
        }
    }

    function confirmPassword(text){
        setMessage('');
        setSecondPassword(text);
        if(text != password && text != ''){
            setMessage('Passwords do not match');
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.form}>
            <TextInput 
                style={styles.textInput}
                placeholder= 'Your email'
                placeholderTextColor='#999' 
                autoCapitalize='none'
                autoCorrect={false}
                value={email}
                onChangeText={text=>setEmail(text)}/>


            <TextInput 
                style={styles.textInput}
                placeholder= 'Your Name'
                placeholderTextColor='#999' 
                autoCapitalize='words'
                autoCorrect={false}
                value={name}
                onChangeText={text=>setName(text)}/>


            <TextInput 
                style={styles.textInput}
                placeholder= 'Your password'
                placeholderTextColor='#999' 
                autoCapitalize='none'
                secureTextEntry = {true}
                autoCorrect={false}
                value={password}
                onChangeText={text=>setPassword(text)}/>

            <TextInput 
                style={styles.textInput}
                placeholder= 'Confirm password'
                placeholderTextColor='#999' 
                autoCapitalize='none'
                secureTextEntry = {true}
                autoCorrect={false}
                value={secondPassword}
                onChangeText={text=>confirmPassword(text)}/>
            {message.length > 0 &&
                <Text style={styles.messageText}>{message}</Text>
            }
             </View>
             <TouchableOpacity style={styles.action} onPress={handlePressSignIn}>
                <Text style={styles.actionText}>Sign in</Text>
             </TouchableOpacity>
    </View>
    )
}