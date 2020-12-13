import React, {
    useEffect, useState, useContext
} from 'react';
import {
     Image, View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions
} from 'react-native';
import  MapView, { Marker, Callout }  from 'react-native-maps';
import {
    requestPermissionsAsync,
    getCurrentPositionAsync
} from 'expo-location';
import {MaterialIcons, Ionicons, FontAwesome} from '@expo/vector-icons';
import axios from 'axios';
import StarRating from 'react-native-star-rating';

import api from '../../services/api';
import styles from './styles';
import apiGeoKey from '../../config/keys';
import anonimusImage from '../../assets/anonimo.png';
import { userContext } from '../../context';

function Map({navigation}) {

    const {user, addLikedBabysitter, deleteLikedBabysitter, expoPushToken} = useContext(userContext);

    const [babysitters, setBabysitters] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [location, setLocation] = useState('');
    const [pitchEnabled, setPitchEnabled] = useState(true);
    const [scroolEnabled, setScroolEnabled] = useState(true);
    const [zoomEnabled, setZoomEnabled] = useState(false);
    const [rotateEnabled, setRotateEnabled] = useState(true);
    const [screenWidth, setscreenWidth] = useState();

    function setLikedBabysitters(babysitters){
        console.log(user)
        const babysittersWithLike = babysitters.map(myBabysitter => {
            for(var i = 0; i <  user.likedBabysitters.length; i++){
               
                if(user.likedBabysitters[i] === myBabysitter._id){
                    myBabysitter.isLiked = true;
                    break;
                } else{
                    myBabysitter.isLiked = false
                }
            };
            return myBabysitter;
        });
        
        setDistanceFromUser(babysittersWithLike)
        //setBabysitters(babysittersWithLike)
    }
   
     function setDistanceFromUser(babysitters){
        const babysittersWithDistance = babysitters.map(async babysitter => {
            const lat1 = babysitter.location.coordinates[1];
            const lon1 = babysitter.location.coordinates[0];
            const lat2 = currentRegion.latitude;
            const lon2 = currentRegion.longitude;
            
            const response = await api.get('/distance',{
                params:{
                    lat1,
                    lat2,
                    lon1,
                    lon2,
                }
            });
            babysitter.distanceFromUser = response.data.distance.toString().substring(0, 4);
            console.log(babysitter);
            
            return babysitter;
        })
        
        Promise.all(babysittersWithDistance).then(babysitters =>  setBabysitters(babysitters))
    }
    
    function handleSetIsLiked(isLiked, babysitter){
        babysitter.isLiked = isLiked;
        if(isLiked){
            addLikedBabysitter(babysitter);
        }else{
            deleteLikedBabysitter(babysitter);
        }
    }
    
    var previousRegion = {};
    useEffect(() => {
        const screenWidth = Math.round(Dimensions.get('window').width);
        console.log(screenWidth);
        
        setscreenWidth(screenWidth-10);
        loadInitialPosition();
    }, []);

    async function loadInitialPosition() {
        const {
            granted
        } = await requestPermissionsAsync();
        if (granted) {
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true,
            });
            console.log('load initial position function');

            const { latitude, longitude } = coords;

            setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            });

            loadBabysitters();
        }
    }

    async function loadBabysitters(){
        console.log(`load babysitters function`);
        if(currentRegion == null)
        {
            return;
        }
        const {latitude, longitude} = currentRegion;
        
        const response = await api.get('/search',{
            params: {
                latitude,
                longitude,
            }
        } );
        const babySitters = response.data.babySitters;
        
        // if (babySitters.length > 0){
        //     babySitters.map((babysitter, index) => {
        //         if(babysitter.photo.length > 0){
        //             babysitter.photo = `http://10.0.0.18:3333/static/${babysitter.photo}`;
        //         }
        //     })    
        // }
        setLikedBabysitters(babySitters)
    }

    function handleRegionChanged(region){
        
        console.log('region changed:');
        if(previousRegion === region ){
            return;
        }
        setCurrentRegion(region);
        loadBabysitters();
        previousRegion = region;

        
    }

    async function changeMapPosition(){
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        var addressEncoded = encodeURIComponent(location);

        var request_url = api_url
          + '?'
          + 'q=' + addressEncoded
          + '&key=' + apiGeoKey;


        const apiResponse = await axios.get(request_url);
        const pos = apiResponse.data.results.map(res => res.geometry);    
        console.log('change map position function');
        setCurrentRegion( {
            latitude: pos[0].lat,
            longitude: pos[0].lng,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04});

        loadBabysitters();
        setLocation('');
    }

    function handlePressMapView(e) {
        console.log(e.nativeEvent.coordinate);
//        setCurrentRegion(e.nativeEvent.coordinate);

    }
    
    console.log('before return');
    if (!currentRegion) {
        return null;
    }
    return(
    <View style = {styles.container}>
     <MapView 
      onRegionChangeComplete={handleRegionChanged}
      region={currentRegion}
      pitchEnabled = {pitchEnabled}
      scroolEnabled = {scroolEnabled}
      zoomEnabled = {zoomEnabled} 
      rotateEnabled = {rotateEnabled}
     // onPress = {handlePressMapView}
      style={styles.map}>
        <Marker coordinate={{latitude: currentRegion.latitude, longitude: currentRegion.longitude}}></Marker>
      {
      babysitters.map(babysitter => (
           babysitter &&
          <Marker key= {babysitter._id} coordinate={{ latitude: babysitter.location.coordinates[1], longitude: babysitter.location.coordinates[0] }}>
             { babysitter.photo.length > 1 ?
             <Image style={styles.avatar} source={{uri : `http://10.0.0.18:3333/static/${babysitter.photo}`}}/>
             :
             <Image style={styles.avatar} source={anonimusImage}/>
             }

            <Callout 
            style={styles.callout} 
            onPress={()=>{navigation.navigate('SavedNannyProfile', {'worker' : babysitter});
            }}>
                <View style={styles.inCallout}>
                    <Text style={styles.devName}>{babysitter.name}</Text>
                    <Text style={styles.devBio}>Age: {babysitter.age}</Text>
                </View>
            </Callout>
      </Marker>
           
      ))}  
     </MapView>
    <View style={styles.searchForm}>
        <TextInput 
        style={styles.searchInput}
        placeholder= 'Search by location'
        placeholderTextColor='#999' 
        autoCapitalize='words'
        autoCorrect={false}
        value={location}
        onChangeText={text=>setLocation(text)}/>

        <TouchableOpacity
         style={styles.loadButton} 
         onPress={changeMapPosition} >
            <Ionicons name='md-search'
            size={25}
            color='#fff'/>
        </TouchableOpacity>
    </View>
    <View style={styles.myLocation}>
        <TouchableOpacity
             style={[styles.loadButton, {backgroundColor: '#f20079'}]} 
             onPress={loadInitialPosition} >
                <MaterialIcons name='my-location'
                size={20}
                color='#fff'/>
            </TouchableOpacity>
    </View>
    <View style={styles.numberOfFounds}>
        <Text style={styles.numberOfFoundsText}>{babysitters.length} Nannies were found</Text>
    </View>
    <ScrollView horizontal style={styles.babysittersList}>
            {
                babysitters.map(babysitter => (
                babysitter &&
                <TouchableOpacity 
                    key= {babysitter._id} 
                    onPress={() => navigation.navigate('SavedNannyProfile', {'worker' : babysitter})}
                    style={[styles.babysitterItem, {width: screenWidth}]}>
                    <StarRating
                       disabled={true}
                       containerStyle={styles.starsContainer}
                       starSize={20}
                       maxStars={5}
                       rating={babysitter.stars}
                       fullStarColor={'#fff000'}
                    />
                    <View>
                        { babysitter.photo.length > 0 ?
                        <Image style={styles.imageBabysitter} source={{uri : `http://10.0.0.18:3333/static/${babysitter.photo}`}}/> 
                        :
                        <Image style={styles.imageBabysitter} source={anonimusImage}/>
                    }
                    <TouchableOpacity style={styles.likeButton} onPress={() => handleSetIsLiked(!babysitter.isLiked, babysitter)}>
                            {babysitter.isLiked ?
                            <Ionicons name='md-heart' size={25} style={{color: '#f20079'}}></Ionicons>
                            :
                            <Ionicons name='md-heart-empty' size={25} style={{color: '#515151'}}></Ionicons>}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.babysitterInfo}>
                        <Text style={styles.infoText}>{babysitter.name}</Text>
                        <Text style={styles.ageText}>Age: {babysitter.age}</Text>
                        <View style={styles.rateBox}>
                            <FontAwesome name='shekel' size={15} style={styles.shekel} ></FontAwesome>
                            <Text style={styles.ratePrice}>{babysitter.rate}/h</Text>    
                        </View>
                        <Text style={ styles.distanceFromUser}>{babysitter.distanceFromUser} km from you</Text>
                        
                    </View>
                </TouchableOpacity> 
                ))}  
    </ScrollView>
    </View>
    )
}

export default Map;