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
import {MaterialIcons, Ionicons, FontAwesome, FontAwesome5} from '@expo/vector-icons';
import axios from 'axios';
import StarRating from 'react-native-star-rating';
import {staticAddress} from '../../services/api';
import styles from './styles';
import apiGeoKey from '../../config/keys';
import anonimusImage from '../../assets/anonimo.png';
import { userContext } from '../../contexts/UserContext';
import { familyContext } from '../../contexts/FamilyContext';

function Map({navigation}) {

    const {user} = useContext(userContext);
    const {searchBabysitters,  addLikedBabysitter, deleteLikedBabysitter} = useContext(familyContext);

    const [babysitters, setBabysitters] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [location, setLocation] = useState('');
    const [pitchEnabled, setPitchEnabled] = useState(true);
    const [scroolEnabled, setScroolEnabled] = useState(true);
    const [zoomEnabled, setZoomEnabled] = useState(false);
    const [rotateEnabled, setRotateEnabled] = useState(false);
    const [screenWidth, setscreenWidth] = useState();
   
    var previousRegion = {};
    useEffect(() => {
        const screenWidth = Math.round(Dimensions.get('window').width);
        setscreenWidth(screenWidth-10);
        loadInitialPosition();

    }, []);

    
    async function loadInitialPosition() {
        const {
            granted
        } = await requestPermissionsAsync();
        if (granted) {
            console.log('load initial position function');
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true,
            });

            const { latitude, longitude } = coords;

            setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            });
            await loadBabysitters()
        }
    }

    async function loadBabysitters(){
        console.log(`load babysitters function`);
        if(currentRegion == null)
        {
            return;
        }
        const {latitude, longitude} = currentRegion;
        
        const babySitters = await searchBabysitters(latitude, longitude);
        
        const isEqual = false;
        if(babysitters.length > 0){
            isEqual = babySitters.every((babysitter, index) => babysitter.id == babysitters[index].id);
        }
        if(isEqual){
            console.log('not render');
            return;
        }
        setBabysitters(babySitters);
    }

    function handleSetIsLiked(isLiked, babysitter){
        babysitter.isLiked = isLiked;
        if(isLiked){
            addLikedBabysitter(babysitter.id, user.id);
        }else{
            deleteLikedBabysitter(babysitter.id, user.id);
        }
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
        setLocation('');
    }

    console.log('before return');
    if (!currentRegion) {
        return(
        <View style={styles.loadingContainer}>
            <FontAwesome5 name="search-location" size={118} color="#f20079" />
            <Text style={styles.waitText}>
                Please wait, we are getting your location to load a beautiful map :)
            </Text>
        </View>
        ) 
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
          <Marker key= {babysitter.id} coordinate={{ latitude: babysitter.latitude, longitude: babysitter.longitude }}>
             { babysitter.photo.length > 1 ?
             <Image style={styles.avatar} source={{uri : `${staticAddress}${babysitter.photo}`}}/>
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
                    key= {babysitter.id} 
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
                        <Image style={styles.imageBabysitter} source={{uri : `${staticAddress}${babysitter.photo}`}}/> 
                        :
                        <Image style={styles.imageBabysitter} source={anonimusImage}/>
                    }
                    <TouchableOpacity style={styles.likeButton} onPress={() => handleSetIsLiked(!babysitter.isLiked, babysitter)}>
                            {babysitter.isLiked ?
                            <Ionicons name='md-heart' size={25} style={{color: '#f20079'}}></Ionicons>
                            :
                            <Ionicons name='md-heart-outline' size={25} style={{color: '#515151'}}></Ionicons>}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.babysitterInfo}>
                        <Text style={styles.infoText}>{babysitter.name}</Text>
                        <Text style={styles.ageText}>Age: {babysitter.age}</Text>
                        <View style={styles.rateBox}>
                            <FontAwesome name='shekel' size={15} style={styles.shekel} ></FontAwesome>
                            <Text style={styles.ratePrice}>{babysitter.rate}/h</Text>    
                        </View>
                        <Text style={ styles.distanceFromUser}>{Math.round(babysitter.distanceAway)} meters from you</Text>
                        
                    </View>
                </TouchableOpacity> 
                ))}  
    </ScrollView>
    </View>
    )
}

export default Map;