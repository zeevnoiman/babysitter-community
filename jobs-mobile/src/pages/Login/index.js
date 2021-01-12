import React, { useState, useContext
} from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import api from '../../services/api';

import styles from './styles'
import { userContext } from '../../contexts/UserContext';

export default function Login({navigation}){

    const {setUser, setToken, loadWorks} = useContext(userContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const role = navigation.getParam('role');

    async function handlePressLogin(){
        try{
            setMessage('');
        const res = await api.post('/login',
         {
            email,
            password,
         }
        );
        // if(res.data.user.role != role){
        //     setMessage(`You are not registered as ${role}, please enter with your correct user`);
        //     return;
        // }
        await AsyncStorage.removeItem('User');
        await AsyncStorage.removeItem('Token');
        await AsyncStorage.setItem('User', JSON.stringify(res.data.user));
        await AsyncStorage.setItem('Token', JSON.stringify(res.data.token));
        if(role === 'Family'){
            setUser(res.data.user);
            setToken(res.data.token);
            
            //navigation.navigate('Map')
            //navigation.navigate('LikedNannies')
            navigation.navigate('MainPageFamily')
        }
        else{
            console.log(res.data.user._id);
            
        const workerResponse = await api.get(`/babysitter/${res.data.user._id}`,
         {
             headers:{
                 authorization: `Bearer ${res.data.token}`
             }
         }
         );
         console.log(workerResponse.data);
         
         navigation.navigate('SavedNannyProfile', {
             'worker': workerResponse.data.babysitter,
         })
        }
        }
        catch(error){
            setMessage('Password and email not matching, try again');
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