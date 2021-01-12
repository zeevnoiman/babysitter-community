import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity,TouchableHighlight, ImageBackground, Dimensions} from 'react-native';
import {MaterialIcons, Ionicons, FontAwesome, 
    FontAwesome5} from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';

import api from '../../services/api'
import { userContext } from '../../contexts/UserContext';
import styles from './styles';
import anonimusImage from '../../assets/anonimo.png';
import backgroundPattern from '../../assets/backgroundPattern.png';

export default function LikedNannies({navigation}){

    const {user, token, deleteLikedBabysitter} = useContext(userContext);
    const [babysitters, setBabysitters] = useState([]);
    
    
    useEffect(() => {
        loadBabysitters();
    }, [])

    async function loadBabysitters(){
        const response = await api.get('/like', {
            headers:{
                Authorization: `Bearer ${token}`,
                user_id: user._id
            }
        });
        console.log(response.data);
        
        setBabysitters(response.data.likedBabysitters);
    }

    async function handleDeleteLiked(babysitter){
        console.log('handle delete', babysitter);
        
        const res = await deleteLikedBabysitter(babysitter);
        if(res){
            console.log(res);
            
            loadBabysitters();
        }
    }
    return(
        <View style={styles.container}>
            <ImageBackground source={backgroundPattern} style={{height: '100%', width: '100%', position: 'absolute'}}></ImageBackground>
            
            <FlatList
            style={styles.babysittersList}
            data={babysitters}
            keyExtractor={ babysitter => String(babysitter._id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item : babysitter}) => (
                <View>
                <TouchableOpacity
                style={[styles.babysitterItem]} 
                onPress={() => navigation.navigate('SavedNannyProfile', {'worker' : babysitter})}
                >
                        <StarRating
                           disabled={true}
                           containerStyle={styles.starsContainer}
                           starSize={20}
                           maxStars={5}
                           rating={babysitter.stars}
                           fullStarColor={'#fff000'}
                        />
                        <View >
                            { babysitter.photo.length > 0 ?
                            <Image style={styles.imageBabysitter} source={{uri : `http://10.0.0.18:3333/static/${babysitter.photo}`}}/> 
                            :
                            <Image style={styles.imageBabysitter} source={anonimusImage}/>
                        }
                        </View>
                        <View style={styles.babysitterInfo}>
                            <Text style={styles.infoText}>{babysitter.name}</Text>
                            <Text style={styles.ageText}>Age: {babysitter.age}</Text>
                            <View style={styles.rateBox}>
                                <FontAwesome name='shekel' size={15} style={styles.shekel} ></FontAwesome>
                                <Text style={styles.ratePrice}>{babysitter.rate}/h</Text>    
                            </View>                       
                        </View>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteLiked(babysitter)}>
                            <FontAwesome5 name='trash-alt' size={20}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    </View>
            )}
            />
            
        </View>    
    )
}