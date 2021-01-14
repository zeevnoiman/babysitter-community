import React, {useState, useContext} from 'react';
import { View, Text, TextInput,
        TouchableOpacity, Image,
        CheckBox, ScrollView,
        KeyboardAvoidingView, Platform,
        Modal, YellowBox
       } from 'react-native';
import {Entypo, FontAwesome, 
    EvilIcons} from '@expo/vector-icons'
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
 
import styles from './styles';

import anonimusImage from '../../assets/anonimo.png';
import { userContext } from '../../contexts/UserContext';
import { babysitterContext } from '../../contexts/BabysitterContext';


export default function EditNannyProfile({navigation}){
    
    const {user} = useContext(userContext);
    const {saveBabysitter} = useContext(babysitterContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [perfilImage, setPerfilImage] = useState('');
    const [age, setAge] = useState('');
    const [maleIsSelected, setMaleIsSelected] = useState();
    const [femaleIsSelected, setFemaleIsSelected] = useState(true);
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [profissionalBio, setProfissionalBio] = useState('');
    const [rate, setRate] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [isShownPicker, setIsShownPicker] = useState(false);

    YellowBox.ignoreWarnings([
        'VirtualizedLists should never be nested', // TODO: Remove when fixed
    ])

    const languageItems = [
        'Hebrew',
        'English',
        'Spanish',
        'Arabic',
        'Russian',
    ]

    function handleMaleRadioButton(value){
        setMaleIsSelected(value);
        setFemaleIsSelected(!value);
    }

    function handleFemaleRadioButton(value){
        setMaleIsSelected(!value);
        setFemaleIsSelected(value);
    }

    function openModal(){
        setModalVisible(true);
    }
    async function handleUploadFromCamera(){
        const {granted} = 
        await ImagePicker.requestCameraPermissionsAsync();
    if(granted){
        try {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.cancelled) {
              console.log(result.uri);
                
              setPerfilImage(result.uri);
              setModalVisible(false);
            }
         }
        catch (E) {
            console.log(E);
          }
        }
    }
    async function handleUploadFromLibrary(){
        const {granted} = 
            await ImagePicker.requestCameraRollPermissionsAsync();
        if(granted){
            try {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 1,
                });
                if (!result.cancelled) {
                    console.log(result.uri);
                    
                  setPerfilImage(result.uri);
                  setModalVisible(false);
                }
        }
        catch (E) {
            console.log(E);
          }
    } 

    }
    async function handleSaveButton(){

        var languagesString = (selectedItems.map(item => item.label)).toString();
        
        var gender = femaleIsSelected ? 'female' : 'male';

        var data = new FormData();
        data.append('age', age);
        data.append('gender', gender);
        data.append('phone', phone);
        data.append('country', country);
        data.append('city', city);
        data.append('neighborhood', neighborhood);
        data.append('street', street);
        data.append('bio', profissionalBio);
        data.append('rate', rate);
        data.append('languages', languagesString);
        data.append('user_id', user.id);
        if(perfilImage.length > 0){
            data.append('photo', {
                uri: perfilImage,
                name: 'babysitterProfile.jpg',
                type: 'image/jpg'
        });
        }

        try {
            await saveBabysitter(data);
            // navigation.navigate('SavedNannyProfile')    
        } catch (error) {
            console.log(error);
            
        }
    }

    return(
    <KeyboardAvoidingView 
    keyboardVerticalOffset = '100'
    behavior={Platform.select({
        android: 'height',
        ios: 'padding'
    })}>
    <ScrollView 
    contentContainerStyle = {styles.contentContainer} 
    >
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titleModal}>Upload photo from </Text>
            <View style={styles.modalActions}>
            <TouchableOpacity
              style={ styles.modalAction}
              onPress={() => {
                handleUploadFromLibrary();
              }}
            >
              <Text style={styles.buttonText}>Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ styles.modalAction}
              onPress={() => {
                handleUploadFromCamera();
              }}
            >
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <EvilIcons name='close' size={20} style={styles.textStyle}></EvilIcons>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        <View style={styles.imageBox}>  
            {perfilImage.length > 0 ?
            <Image style={styles.anonimusImage} source={{uri : perfilImage}}/>
            :
            <Image style={styles.anonimusImage} source={anonimusImage}/>
            }
            <TouchableOpacity style={styles.uploadButton} onPress={openModal}>
                <Entypo name='camera' size={25} style={{color: '#9338ba'}}/>
            </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.verticalBox}>
            <TextInput
                style={styles.ageInput}
                placeholder='My age'
                placeholderTextColor='#333' 
                autoCapitalize='none'
                value = {age}
                onChangeText = {age => setAge(age)} 
            ></TextInput>
            {age.length > 0 && 
            <Text style={styles.yearsOld}>Years Old</Text>}
        </View>
        <View style={styles.descriptionBox}>
        <Text style={styles.title}>About Me</Text>
            <View style={styles.checkboxBox}>

                <View style={styles.verticalBox}>
                    <CheckBox
                        value={femaleIsSelected}
                        onValueChange={value => handleFemaleRadioButton(value)}
                        style={styles.checkbox}/>
                    <Text style={styles.checkboxText}>I am a woman!</Text>
                </View>
                <View style={styles.verticalBox}>
                    <CheckBox
                        value={maleIsSelected}
                        onValueChange={value => handleMaleRadioButton(value)}
                        style={styles.checkbox}/>
                    <Text style={styles.checkboxText}>I am a man!</Text>
                </View>
            </View>
            <TextInput
            style={styles.phoneInput}
            placeholder='Phone Number'
            placeholderTextColor='#333'
            value={phone}
            onChangeText={text => setPhone(text)}
            returnKeyType='next'
            onSubmitEditing={() => globalThis.Country.focus()}
            >
            </TextInput>
        </View>
        <View style={styles.addressBox}>
        <TextInput
             style={styles.phoneInput}
             placeholder='Country'
             placeholderTextColor='#333'
             returnKeyType='next'
             value={country}
             onChangeText={text => setCountry(text)}
             ref={(input) => { globalThis.Country = input; }}
             onSubmitEditing={() => globalThis.City.focus()}
            ></TextInput>
            <TextInput
             style={styles.phoneInput}
             placeholder='City'
             placeholderTextColor='#333'
             returnKeyType='next'
             value={city}
             onChangeText={text => setCity(text)}
             ref={(input) => { globalThis.City = input; }}
             onSubmitEditing={() => globalThis.Neighbourhood.focus()}
            ></TextInput>
            <TextInput
             style={styles.phoneInput}
             placeholder='Neighbourhood'
             placeholderTextColor='#333'
             returnKeyType='next'
             value={neighborhood}
             onChangeText={text => setNeighborhood(text)}
             ref={(input) => { globalThis.Neighbourhood = input; }}
             onSubmitEditing={() => globalThis.Street.focus()}
            ></TextInput>
            <TextInput
             style={styles.phoneInput}
             placeholder='Street, house number'
             placeholderTextColor='#333'
             returnKeyType='next'
             value={street}
             onChangeText={text => setStreet(text)}
             ref={(input) => { globalThis.Street = input; }}
             onSubmitEditing={() => globalThis.Experiences.focus()}
            ></TextInput>
        </View>
        <View style={styles.profissonalBox}>
            <Text style={styles.title}>Professional Experience</Text>
            <TextInput
                style={styles.descriptionInput}
                placeholder='Tell something about yourself, your experiences and specializations...'
                placeholderTextColor='#333'
                multiline={true}
                numberOfLines={7}
                value={profissionalBio}
                onChangeText={text => setProfissionalBio(text)}
                ref={(input) => { globalThis.Experiences = input; }}>
            </TextInput>
            
            <View style={styles.languagesBox}>
            <Text style={styles.title}>Languages</Text>
            <TouchableOpacity
                onPress={() => setIsShownPicker(!isShownPicker)}
                style={styles.pickerButton}
                >
                <Text style={styles.pickerButtonText}>Select Languages</Text>
            </TouchableOpacity>
            {isShownPicker ? 
            <MultipleSelectPicker
                items={languageItems}
                onSelectionsChange={(ele) => setSelectedItems(ele)}
                selectedItems={selectedItems}
                style={{width: 150, marginTop: 10}}
                rowStyle={styles.rowStyle}
                labelStyle={{fontFamily: 'Montserrat'}}
                checkboxStyle={{ height: 20, width: 20, marginRight: 10, color: '#008577' }}
            />
                : null
            }
        </View>

            <View style={styles.verticalBox}>
             <Text style={styles.rateText}>Your rate per hour in shekels</Text>   
            <TextInput
            placeholder='Rate'
            placeholderTextColor='#333'
            value={rate}
            onChangeText={text => setRate(text)}
            style={styles.rateInput}
            >
            </TextInput>    
            <FontAwesome name='shekel' size={16} style={{marginTop: 20, marginLeft: 10}}></FontAwesome>
            </View>
        </View> 
           
        <TouchableOpacity 
        onPress={handleSaveButton}
        style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
    )
}