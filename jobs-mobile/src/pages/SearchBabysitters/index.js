import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import ScheduleForm from '../../components/ScheduleForm/ScheduleForm';
import styles from './styles'
function SearchBabysitters(){

    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [rate, setRate] = useState([0, 100]);
    const [scheduledItems, setScheduledItems] = useState([
        {
          year: new Date().getFullYear().toString(),
          month_day: '01' + new Date().getDate().toString(),
          from: '01:00',
          to: '01:00'
        }
    ]);

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
    }
      
    
    return(
        <View style={styles.container}> 
            <View style={styles.searchForm}>
                <View style={styles.inputBox}>    
                    <TextInput 
                    style={styles.searchInput}
                    placeholder= 'Name'
                    placeholderTextColor='#999' 
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={name}
                    onChangeText={text=>setCity(text)}/>

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
                <TouchableOpacity
                style={styles.loadButton} 
                onPress={() => {}} >
                    <Ionicons name='md-search'
                    size={25}
                    color='#fff'/>
                </TouchableOpacity>
        </View>
    </View>
    )
}

export default SearchBabysitters;