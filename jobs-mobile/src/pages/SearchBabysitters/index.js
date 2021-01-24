import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';

function SearchBabysitters(){

    const [city, setCity] = useState('');
    const [language, setLanguage] = useState('');
    const [name, setName] = useState('');
    const [rate, setRate] = useState([]);
    
    return(
        <View style={styles.searchForm}>
        <TextInput 
        style={styles.searchInput}
        placeholder= 'Search by city'
        placeholderTextColor='#999' 
        autoCapitalize='words'
        autoCorrect={false}
        value={location}
        onChangeText={text=>setCity(text)}/>
       
        <TextInput 
        style={styles.searchInput}
        placeholder= 'Search by language'
        placeholderTextColor='#999'
        autoCapitalize='words'
        autoCorrect={false}
        value={location}
        onChangeText={text=>setLanguage(text)}/>

        <TextInput 
        style={styles.searchInput}
        placeholder= 'Search by name'
        placeholderTextColor='#999' 
        autoCapitalize='words'
        autoCorrect={false}
        value={location}
        onChangeText={text=>setCity(text)}/>

        <TextInput 
        style={styles.searchInput}
        placeholder= 'Search by name'
        placeholderTextColor='#999' 
        autoCapitalize='words'
        autoCorrect={false}
        value={location}
        onChangeText={text=>setCity(text)}/>

        <TextInput 
        style={styles.searchInput}
        placeholder= 'Search by name'
        placeholderTextColor='#999' 
        autoCapitalize='words'
        autoCorrect={false}
        value={location}
        onChangeText={text=>setCity(text)}/>

        <TouchableOpacity
         style={styles.loadButton} 
         onPress={changeMapPosition} >
            <Ionicons name='md-search'
            size={25}
            color='#fff'/>
        </TouchableOpacity>
    </View>
    
    )
}

export default SearchBabysitters;