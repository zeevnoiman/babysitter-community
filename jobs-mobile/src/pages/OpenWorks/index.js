import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import {MaterialIcons, Ionicons, FontAwesome, 
    FontAwesome5} from '@expo/vector-icons';
import {isBefore, getDate, getDay, formatRelative, parseISO} from 'date-fns'
import { zonedTimeToUtc, format } from 'date-fns-tz';

import anonimusImage from '../../assets/anonimo.png';
import backgroundPattern from '../../assets/backgroundPattern.png';
import api from '../../services/api';
import { userContext } from '../../contexts/UserContext';
import styles from './styles';


export default function OpenWorks({navigation}){

    const {loadWorks, works, token} = useContext(userContext);
    const [newWorks, setNewWorks] = useState([]);
    var day = []
    useEffect(() => {
        loadWorks();
    }, []);

    useEffect(() => {
        const newWorks = works.map(async work => {
        const response = await api.get(`/babysitter/${work.nanny}`,{
            headers:{
                authorization : `Bearer ${token}`
            }
        });

       // console.log(response.data);
        
        work.nannyProfile = response.data;
        return work;
    });

    Promise.all(newWorks).then(newWorks =>  setNewWorks(newWorks))

    }, [works])

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundPattern} style={{height: '100%', width: '100%', position: 'absolute'}}></ImageBackground>
            
        <FlatList
        style={styles.worksList}
        data={newWorks.sort((a, b) => { 
                if(isBefore(a.dateHourStartDateFormat, b.dateHourStartDateFormat)){
                    return -1;
                }
                else{
                    return 1;
                }
            })}
        keyExtractor={ work => String(work._id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item : work, index}) => {
            day = [...day, getDate(work.dateHourStartDateFormat)];
            
            return ( 
                
                    isBefore(new Date(), work.dateHourStartDateFormat) ?
                    <View>
                    {
                    index != 0 && day[index-1] == getDate(work.dateHourStartDateFormat) ?
                     null : 
                     <View style={styles.subtitle}>
                        <Text  style={styles.subtitleText}>{format(work.dateHourStartDateFormat, 'EEEE') }</Text>
                        <Text  style={[styles.subtitleText, {marginRight: 5}]}>{format(work.dateHourStartDateFormat, 'dd/MM/yyyy') }</Text>
                    </View>
                    }
                    <View style={[styles.babysitterItem]} >
                            <View style={styles.avatarContainer}>
                                { work.nannyProfile.photo.length > 0 ?
                                <Image style={styles.imageBabysitter} source={{uri : `http://10.0.0.18:3333/static/${work.nannyProfile.photo}`}}/> 
                                :
                                <Image style={styles.imageBabysitter} source={anonimusImage}/>
                            }
                            </View>
                            <View style={styles.babysitterInfo}>
                                <TouchableOpacity onPress={() => navigation.navigate('SavedNannyProfile', {'worker' : work.nannyProfile})}>
                                    <Text style={styles.infoText}>{work.nannyProfile.name}</Text>
                                </TouchableOpacity>
                                <View style={styles.dateRow}>
                                <Text style={styles.ageText}>From:</Text>
                                <Text style={[styles.ageText, {marginLeft: 10}]}>{format(work.dateHourStartDateFormat, 'HH:mm:ss')}</Text>
                                </View>
                                <Text style={styles.ageText}>To:</Text>                     
                                <Text style={styles.ageText}>{work.dateHourFinishReadable}</Text>                     
                            </View>
                            <View style={styles.rateBox}>
                                    <FontAwesome name='shekel' size={15} style={styles.shekel} ></FontAwesome>
                                    <Text style={styles.ratePrice}>{work.defined_value_to_pay}/h</Text>    
                            </View>  
                    </View>
                </View> 
                :
                null
                )}
                        }
        />
        </View>
    )
}