import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import styles from './styles'
function SearchBabysitters(){

    const [city, setCity] = useState('');
    const [language, setLanguage] = useState('');
    const [name, setName] = useState('');
    const [rate, setRate] = useState([0, 100]);
    
    return(
        <View style={styles.container}> 
            <View style={styles.searchForm}>
                <TextInput 
                style={styles.searchInput}
                placeholder= 'Search by city'
                placeholderTextColor='#999' 
                autoCapitalize='words'
                autoCorrect={false}
                value={city}
                onChangeText={text=>setCity(text)}/>
            
                <TextInput 
                style={styles.searchInput}
                placeholder= 'Search by language'
                placeholderTextColor='#999'
                autoCapitalize='words'
                autoCorrect={false}
                value={language}
                onChangeText={text=>setLanguage(text)}/>

                <TextInput 
                style={styles.searchInput}
                placeholder= 'Search by name'
                placeholderTextColor='#999' 
                autoCapitalize='words'
                autoCorrect={false}
                value={name}
                onChangeText={text=>setCity(text)}/>

                <MultiSlider 
                values={rate}
                onValuesChangeFinish={(values) => setRate(values)}
                min={0}
                max={100}
                step={5}
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