import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import { MaterialIcons } from '@expo/vector-icons'; 

import anonimusImage from '../../assets/anonimo.png';
import {staticAddress} from '../../services/api';
import { userContext } from '../../contexts/UserContext';
import { workContext } from '../../contexts/WorkContext';
import styles from './styles';

export default function NannyReviews({route}){

    const {user} = useContext(userContext);
    const {loadReviews} = useContext(workContext);
    const [reviews, setReviews] = useState([]);
    
    const {nanny} = route.params;    
    var day = []

    useEffect(() => {
        async function loadInitialReviews(){
            const reviews = await loadReviews(nanny.id);
            console.log(reviews);
            setReviews(reviews);
        }
        loadInitialReviews()
    }, []);
     
    if(reviews.length < 1){
        return(
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                <MaterialIcons name="rate-review" size={118} color="#f20079" />
                <Text style={styles.waitText}>
                There are no reviews to show...
                </Text>
            </View>
        </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.perfil}>
                <View style={styles.avatarContainer}>
                    { nanny.photo.length > 0 ?
                    <Image style={styles.imageBabysitter} source={{uri : `${staticAddress}${nanny.photo}`}}/> 
                    :
                    <Image style={styles.imageBabysitter} source={anonimusImage}/>
                    }
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SavedNannyProfile', {'worker' : nanny})}>
                    <Text style={styles.titleText}>{nanny.name}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.numReviews}>{reviews.length} reviews</Text>
            <FlatList
            style={styles.worksList}
            data={reviews}
            keyExtractor={ review => String(review.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item : review, index}) => {
            
                return (     
                    <View>
                       <View style={styles.babysitterInfo}>
                            <View style={styles.babysitterItem} >    
                                <View style={styles.subtitle}>
                                    <Text  style={styles.subtitleText}>{review.user_name}</Text>
                                </View>
                                <StarRating
                                    disabled={true}
                                    containerStyle={styles.starsContainer}
                                    starSize={25}
                                    maxStars={5}
                                    rating={review.review_stars}
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