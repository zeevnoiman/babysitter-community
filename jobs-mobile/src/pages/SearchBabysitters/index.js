import React, {useState, useContext} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image,
    LayoutAnimation, FlatList, Platform, UIManager, KeyboardAvoidingView} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import CheckBox from '@react-native-community/checkbox';
import {Ionicons, FontAwesome, 
    FontAwesome5} from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';

import {staticAddress} from '../../services/api';
import anonimusImage from '../../assets/anonimo.png';

import ScheduleForm from '../../components/ScheduleForm/ScheduleForm';
import styles from './styles'
import { familyContext } from '../../contexts/FamilyContext';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function SearchBabysitters({navigation}){

    const {searchFilterBabysitter} = useContext(familyContext);
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [rate, setRate] = useState([0, 100]);
    const [checkboxName, setCheckboxName] = useState(false);
    const [checkboxCity, setCheckboxCity] = useState(false);
    const [checkboxSchedule, setCheckboxSchedule] = useState(false);
    const [checkboxRange, setCheckboxRange] = useState(false);
    const [criterias, setCriterias] = useState([])
    const [expanded, setExpanded] = useState(true);
    const [babysitters, setBabysitters] = useState([]);
    const [scheduledItems, setScheduledItems] = useState([
        {
          year: new Date().getFullYear().toString(),
          month_day: '01' + new Date().getDate().toString(),
          from: '01:00',
          to: '01:00'
        }
    ]);

    const criteriasNames = {
        babysitter_name : 'babysitter_name',
        city : 'city',
        schedule : 'schedule',
        range : 'range'
    };

    function setScheduleItemValue(position, field, value){
        const dataScheduledItems = scheduledItems.map((scheduledItem, index) => {
          if(index === position){
            return {...scheduledItem, [field]: value}
          }
          return scheduledItem;
        });
  
        console.log(dataScheduledItems);
        console.log(rate);
        setScheduledItems(dataScheduledItems)
    };

    function setCheckbox(value, currentCriteria){
        switch(currentCriteria){
            case criteriasNames.babysitter_name : setCheckboxName(value)
                break;
            case criteriasNames.city : setCheckboxCity(value)
                break;
            case criteriasNames.schedule : setCheckboxSchedule(value)
                break;
            case criteriasNames.range : setCheckboxRange(value)
                break;
        }

        if(value){
            setCriterias([...criterias, currentCriteria]);
        } else{
            const newCriterias = criterias.filter(criteria => criteria != currentCriteria);
            setCriterias(newCriterias);
        }
    }

    async function handleSubmitSearch(){
        setBabysitters([]);
        const criteriasString = criterias.join();
        const req = {
            babysitter_name : name,
            city,
            schedule : scheduledItems[0],
            range : rate.join(),
            criterias : criteriasString
        }
        const babysitters = await searchFilterBabysitter(req);
        console.log(babysitters);
        setBabysitters(babysitters)
        setExpanded(false)
    };
      
    
    return(
        <View style={styles.container}> 
        {
            expanded ? 
            <KeyboardAvoidingView 
            keyboardVerticalOffset = '-150'
            behavior={Platform.select({
                android: 'height',
                ios: 'padding'
            })}
            style={styles.searchForm}>
                <View style={styles.inputBox}>    
                    <TextInput 
                    style={styles.searchInput}
                    placeholder= 'Name'
                    placeholderTextColor='#999' 
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={name}
                    onChangeText={text=>setName(text)}/>

                    <TextInput 
                    style={styles.searchInput}
                    placeholder= 'City'
                    placeholderTextColor='#999' 
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={city}
                    onChangeText={text=>setCity(text)}/>
                </View>

                <ScheduleForm position={0} callbackFunction={setScheduleItemValue} />

                <Text style={styles.subtitle}>Range of payment</Text>
                <MultiSlider
                values={rate}
                onValuesChangeFinish={(values) => setRate(values)}
                min={0}
                max={100}
                step={5}
                enableLabel={true}
                customLabel={() => { 
                    return(
                        <View style={styles.sliderLabelContainer}>
                            <Text>{rate[0]} Shekel</Text>
                            <Text>{rate[1]} Shekel</Text>
                        </View>
                    )
                }}
                />

                <View>
                    <View style={styles.checkboxBox}>
                        <Text style={styles.checkboxText}>By name</Text>   
                        <CheckBox
                        value={checkboxName}
                        onValueChange={value => setCheckbox(value, criteriasNames.babysitter_name)}
                        style={styles.checkbox} /> 
                    </View>
                    <View style={styles.checkboxBox}>
                        <Text style={styles.checkboxText}>By city</Text>   
                        <CheckBox
                        value={checkboxCity}
                        onValueChange={value => setCheckbox(value, criteriasNames.city)}
                        style={styles.checkbox} /> 
                    </View>
                    <View style={styles.checkboxBox}>
                        <Text style={styles.checkboxText}>By work hour</Text>   
                        <CheckBox
                        value={checkboxSchedule}
                        onValueChange={value => setCheckbox(value, criteriasNames.schedule)}
                        style={styles.checkbox} /> 
                    </View>
                    <View style={styles.checkboxBox}>
                        <Text style={styles.checkboxText}>By range of price</Text>   
                        <CheckBox
                        value={checkboxRange}
                        onValueChange={value => setCheckbox(value, criteriasNames.range)}
                        style={styles.checkbox} /> 
                    </View>
                </View>
                <TouchableOpacity
                style={styles.loadButton} 
                onPress={() => handleSubmitSearch()} >
                    <Ionicons name='md-search'
                    size={25}
                    color='#333'/>
                </TouchableOpacity>
        </KeyboardAvoidingView> 
        :
        null
        }
        <TouchableOpacity
        style={styles.LayoutAnimationButton}
         onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            setExpanded(!expanded);
          }}>
            {
                expanded ? 
                <Text style={styles.subtitle}>Close Filters</Text>
                :
                <Text style={styles.subtitle}>Open Filters</Text>
            }  
        </TouchableOpacity>

        <View>
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
                    </TouchableOpacity>
                    </View>
            )}
            />
            
        </View>
    </View>
    )
}

export default SearchBabysitters;