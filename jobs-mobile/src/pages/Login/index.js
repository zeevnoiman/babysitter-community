import React, { useState, useContext
} from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import api from '../../services/api';

import styles from './styles'
import { userContext } from '../../contexts/UserContext';

export default function Login({navigation}){

    const {login} = useContext(userContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const role = navigation.getParam('role');

    async function handlePressLogin(){
        try{
            setMessage('');
            login(email, password, role);
        }
        catch(error){
            setMessage(error);
        }
    }

    function navigateToSignin(){
        navigation.navigate('Signin', {'role': role});
    }
    return(
        <View style={styles.container}>
            <Text style={styles.helloText}>Hello {role}, login here:</Text>
            <View style={styles.inputBox}>
                <TextInput 
                    style={styles.textInput}
                    placeholder= 'Your email'
                    placeholderTextColor='#999' 
                    autoCapitalize='none'
                    keyboardType='email-address'
                    autoCorrect={false}
                    value={email}
                    onChangeText={text=>setEmail(text)}/>


                <TextInput 
                    style={styles.textInput}
                    placeholder= 'Your password'
                    placeholderTextColor='#999' 
                    autoCapitalize='none'
                    secureTextEntry = {true}
                    autoCorrect={false}
                    value={password}
                    onChangeText={text=>setPassword(text)}/>
              
            </View>
            {message.length > 0 && 
                <Text style={styles.messageError}>{message}</Text>
            }    
            <TouchableOpacity style={styles.action} onPress={handlePressLogin}>
                <Text style={styles.actionText}>Login</Text>
             </TouchableOpacity>
              
            <TouchableOpacity style={styles.signinBox} onPress={navigateToSignin}>
                <Text style={styles.signinText}>Not registered yet? Click here to signin</Text>
            </TouchableOpacity>
                
        </View>
    )
}