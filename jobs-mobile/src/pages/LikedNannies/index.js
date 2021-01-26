import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity,TouchableHighlight, ImageBackground, Dimensions} from 'react-native';
import {MaterialIcons, Ionicons, FontAwesome, 
    FontAwesome5} from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import {staticAddress} from '../../services/api';
import { userContext } from '../../contexts/UserContext';
import { familyContext } from '../../contexts/FamilyContext';
import styles from './styles';
import anonimusImage from '../../assets/anonimo.png';
import backgroundPattern from '../../assets/backgroundPattern.png';

export default function LikedNannies({navigation}){

    const {user} = useContext(userContext);
    const {deleteLikedBabysitter, getLikedBabysitters, likedBabysitters : babysitters} = useContext(familyContext);
      
    useEffect(() => {
        getLikedBabysitters(user.id);
    }, [])

    async function handleDeleteLiked(babysitter){
        console.log('handle delete', babysitter.id, user.id);
        
        const res = await deleteLikedBabysitter(babysitter.id, user.id);
        if(res){
            console.log(res);
            getLikedBabysitters(user.id);
        }
    }
    return(
        <View style={styles.container}>
            <ImageBackground source={backgroundPattern} style={{height: '100%', width: '100%', position: 'absolute'}}></ImageBackground>
            
            <FlatList
            style={styles.babysittersList}
            data={babysitters}
            keyExtractor={ babysitter => String(babysitter.id)}
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
                            <Image style={styles.imageBabysitter} source={{uri : `${staticAddress}${babysitter.photo}`}}/> 
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