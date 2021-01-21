import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import {MaterialIcons, Ionicons, FontAwesome, 
    FontAwesome5} from '@expo/vector-icons';
import {isBefore, getDate, isAfter} from 'date-fns'
import { zonedTimeToUtc, format } from 'date-fns-tz';

import anonimusImage from '../../assets/anonimo.png';
import backgroundPattern from '../../assets/backgroundPattern.png';
import {staticAddress} from '../../services/api';
import { userContext } from '../../contexts/UserContext';
import { workContext } from '../../contexts/WorkContext';
import { familyContext } from '../../contexts/FamilyContext';
import styles from './styles';


export default function OpenWorks({navigation}){

    const {user} = useContext(userContext);
    const {likedBabysitters} = useContext(familyContext);
    const {works, loadWorks} = useContext(workContext);

    useEffect(() => {
        loadWorks();
    }, [likedBabysitters])
    
    var day = []
    
    if(works.length < 1) {
        return(
            <View style={styles.loadingContainer}>
            <FontAwesome name="calendar" size={118} color="#f20079" />
            <Text style={styles.waitText}>
                There are no future works in your calendary :(
            </Text>
        </View>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundPattern} style={{height: '100%', width: '100%', position: 'absolute'}}></ImageBackground>
            
        <FlatList
        style={styles.worksList}
        data={works.sort((a, b) => { 
                if(isBefore(a.dateHourStartDateFormat, b.dateHourStartDateFormat)){
                    return -1;
                }
                else{
                    return 1;
                }
            })}
        keyExtractor={ work => String(work.id)}
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
                                { work.photo.length > 0 ?
                                <Image style={styles.imageBabysitter} source={{uri : `${staticAddress}${work.photo}`}}/> 
                                :
                                <Image style={styles.imageBabysitter} source={anonimusImage}/>
                            }
                            </View>
                            <View style={styles.babysitterInfo}>
                                <TouchableOpacity onPress={() => navigation.navigate('SavedNannyProfile', {'worker' : {...work, dateHourStartDateFormat: '', dateHourFinishDateFormat: '' }})}>
                                    <Text style={styles.infoText}>{work.name}</Text>
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