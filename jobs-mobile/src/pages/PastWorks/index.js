import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity, Alert, ImageBackground, TextInput, Modal} from 'react-native';
import {EvilIcons, FontAwesome} from '@expo/vector-icons';
import {isBefore, getDate} from 'date-fns'
import { format } from 'date-fns-tz';
import StarRating from 'react-native-star-rating';

import anonimusImage from '../../assets/anonimo.png';
import {staticAddress} from '../../services/api';
import { userContext } from '../../contexts/UserContext';
import styles from './styles';
import { workContext } from '../../contexts/WorkContext';

export default function PastWorks({navigation}){

    const {user} = useContext(userContext);
    const {loadWorks, addReview, works} = useContext(workContext);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [starCount, setStarCount] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewRequiredShow, setReviewRequiredShow] = useState(false);
    const [currentWork, setCurrentWork] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    var day = []
    
    useEffect(() => {
        if(modalVisible == false){
            if(resultMessage != ''){
                Alert.alert(
                    resultMessage,
                    '',
                    [
                      {text: 'Take a look', onPress: () => navigation.navigate('NannyReviews',{'nanny': currentWork})},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                setResultMessage('')  
            }
        }
    }, [modalVisible])

    
    useEffect(() => {
        function sortWorks(){
            works.sort((a, b) => { 
                if(isBefore(a.dateHourStartDateFormat, b.dateHourStartDateFormat)){
                    return -1;
                }
                else{
                    return 1;
                }
            })
        }
        sortWorks();
    }, works)

    async function handleSubmit(){
        if(reviewText == ''){
            setReviewRequiredShow(true);
            return;
        }
        console.log(currentWork);
        
        try{
            await addReview({reviewText, starCount}, currentWork.babysitter_id, currentWork.id)    
            setResultMessage('Your review was added!');
        } catch(err){
            setResultMessage('Error ocurred, try again');
            console.log(err);
        
        } finally{
        setReviewRequiredShow(false);
        setReviewText('');
        setStarCount(0);   
        setModalVisible(false);
        }
    }

    if(works.length < 1 || isBefore(new Date(), works[0].dateHourStartDateFormat,)) {
        return(
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <FontAwesome name="calendar" size={118} color="#f20079" />
                    <Text style={styles.waitText}>
                        There are no past works in your calendary :(
                    </Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
            style={styles.worksList}
            data={works.sort((a, b) => { 
                    if(isBefore(b.dateHourStartDateFormat, a.dateHourStartDateFormat)){
                        return -1;
                    }
                    else{
                        return 1;
                    }
                })}
            keyExtractor={ work => String(work.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item : work, index}) => {
                day = [...day, getDate(work.dateHourStartDateFormat)];
                return ( 
                    
                        isBefore(work.dateHourStartDateFormat, new Date()) ?
                        <View>
                        {
                        index != 0 && day[index-1] == getDate(work.dateHourStartDateFormat) ?
                        null : 
                        <View style={styles.subtitle}>
                            <Text  style={styles.subtitleText}>{format(work.dateHourStartDateFormat, 'EEEE') }</Text>
                            <Text  style={[styles.subtitleText, {marginRight: 5}]}>{format(work.dateHourStartDateFormat, 'dd/MM/yyyy') }</Text>
                        </View>
                        }
                        <View style={[styles.babysitterItem]} >
                                <View style={styles.avatarContainer}>
                                    { work.photo.length > 0 ?
                                    <Image style={styles.imageBabysitter} source={{uri : `${staticAddress}${work.photo}`}}/> 
                                    :
                                    <Image style={styles.imageBabysitter} source={anonimusImage}/>
                                }
                                </View>
                                <View style={styles.babysitterInfo}>
                                    <TouchableOpacity onPress={() => navigation.navigate('SavedNannyProfile', {'worker' :  {...work, dateHourStartDateFormat: '', dateHourFinishDateFormat: '' }})}>
                                        <Text style={styles.infoText}>{work.name}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.dateRow}>
                                    <Text style={styles.ageText}>From:</Text>
                                    <Text style={[styles.ageText, {marginLeft: 10}]}>{format(work.dateHourStartDateFormat, 'HH:mm:ss')}</Text>
                                    </View>
                                    <View style={styles.dateRow}>
                                    <Text style={styles.ageText}>To:</Text>                     
                                    <Text style={[styles.ageText, {marginLeft: 10}]}>{work.dateHourFinishReadable}</Text>                     
                                    </View>
                                    <View style={styles.rateBox}>
                                            <Text style={styles.ageText}>Paid:</Text>
                                            <FontAwesome name='shekel' size={15} style={[styles.shekel, {marginLeft: 10}]} ></FontAwesome>
                                            <Text style={styles.ageText}>{work.defined_value_to_pay}/h</Text>    
                                    </View>  
                                </View>
                                {work.reviewed == true ? null 
                                :
                                <TouchableOpacity style={styles.reviewButton} onPress={() => {
                                    setCurrentWork(work);
                                    setModalVisible(true);    
                                }}>
                                    <Text  style={styles.ReviewText}>Leave a review</Text>
                                </TouchableOpacity>}
                        </View>
                    </View> 
                    :
                    null
                    )}
                            }
            />
            {currentWork &&
            <Modal
            animationType='none'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            }}
            >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.titleModal}>Review to {currentWork.name} </Text>
                <View style={styles.modalActions}>
                    <Text style={styles.ageText}>Give some stars!</Text>
                    <StarRating
                        disabled={false}
                        containerStyle={styles.starsContainer}
                        starSize={25}
                        maxStars={5}
                        rating={starCount}
                        fullStarColor={'#fff000'}
                        selectedStar={(rating) => setStarCount(rating)}
                    />
                    <TextInput
                        style={styles.reviewInput}
                        placeholder='Tell how was the experience, how was the nanny, if the chidlren were happy...'
                        placeholderTextColor='#333'
                        multiline={true}
                        maxLength={200}
                        numberOfLines={7}
                        value={reviewText}
                        onChangeText={text => setReviewText(text)}>
                    </TextInput>
                    {
                        reviewRequiredShow &&
                        <Text style={styles.validationMessage}>Required</Text>
                    }
                </View>
                    
                        <TouchableOpacity
                        style={styles.modalConfirmButton}
                        onPress={
                            handleSubmit}
                        >
                        <Text style={styles.confirmText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.modalCloseButton}
                        onPress={() => {
                            setReviewRequiredShow(false);
                            setReviewText('');
                            setStarCount(0);                    
                            setModalVisible(false);
                        }}
                        >
                        <EvilIcons name='close' size={20} style={styles.textStyle}></EvilIcons>
                        </TouchableOpacity>
                    </View>
                    </View>
            </Modal>}
        </View>
    )
}