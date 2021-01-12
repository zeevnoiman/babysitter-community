import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity, Alert, ImageBackground, TextInput, Modal} from 'react-native';
import {EvilIcons, Ionicons, FontAwesome, 
    FontAwesome5} from '@expo/vector-icons';
import {isBefore, getDate, getDay, formatRelative, parseISO} from 'date-fns'
import { zonedTimeToUtc, format } from 'date-fns-tz';
import StarRating from 'react-native-star-rating';

import anonimusImage from '../../assets/anonimo.png';
import backgroundPattern from '../../assets/backgroundPattern.png';
import api from '../../services/api';
import { userContext } from '../../contexts/UserContext';
import styles from './styles';

export default function NannyReviews({navigation}){

    const {token} = useContext(userContext);
    const [reviews, setReviews] = useState([]);
    
    const nanny = navigation.getParam('nanny');    
    var day = []

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        console.log('load reviews function',token);
        const response = await api.get(`/reviews/${nanny._id}`, {
            headers:{
                authorization: `Bearer ${token}`,
            }   
        });
        const reviews = response.data;
        const newReviews = reviews.map(async review => {
            const response = await api.get('/user',{
                headers:{
                    authorization : `Bearer ${token}`,
                    user_id: review.userId
                }
            });
    
           console.log(response.data);
            
            review.userName = response.data.name;
            return review;
        });
        Promise.all(newReviews).then(newReviews =>  setReviews(newReviews))
    };

   
    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundPattern} style={{height: '100%', width: '100%', position: 'absolute'}}></ImageBackground>
            <View style={styles.perfil}>
                <View style={styles.avatarContainer}>
                    { nanny.photo.length > 0 ?
                    <Image style={styles.imageBabysitter} source={{uri : `http://10.0.0.18:3333/static/${nanny.photo}`}}/> 
                    :
                    <Image style={styles.imageBabysitter} source={anonimusImage}/>
                    }
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SavedNannyProfile', {'worker' : work.nannyProfile})}>
                    <Text style={styles.titleText}>{nanny.name}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.numReviews}>{reviews.length} reviews</Text>
            <FlatList
            style={styles.worksList}
            data={reviews}
            keyExtractor={ review => String(review._id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item : review, index}) => {
            
                return (     
                    <View>
                       <View style={styles.babysitterInfo}>
                            <View style={styles.babysitterItem} >    
                                <View style={styles.subtitle}>
                                    <Text  style={styles.subtitleText}>{review.userName}</Text>
                                </View>
                                <StarRating
                                    disabled={true}
                                    containerStyle={styles.starsContainer}
                                    starSize={25}
                                    maxStars={5}
                                    rating={review.stars}
                                    fullStarColor={'#fff000'}
                                />
                                <Text style={styles.infoText}>{review.message}</Text>
                            </View>
                        </View> 
                    </View> 
                )}
                        }
        />
              </View>
    )
}