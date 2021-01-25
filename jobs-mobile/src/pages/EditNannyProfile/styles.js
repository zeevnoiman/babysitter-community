import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    
    contentContainer:{
          alignItems: 'center',
          paddingBottom: 20      
    },
    imageBox:{
        width: '100%',
       // height: '40%',
    },
    anonimusImage:{
        width: '100%',
        height: 250,
    },
    uploadButton:{
        borderRadius: 100,
        backgroundColor: '#dbd1d0',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 2,
        marginTop: -50,
        marginLeft: 20
    },
    name:{
        marginTop: 10,
        fontFamily: 'mama', 
        fontSize: 25,
        color: '#333'
    },
    verticalBox:{
        flexDirection: 'row'
    },
    ageInput:{
        fontFamily: 'Montserrat',
        fontSize: 20,
        height: 40,
        color: '#333',
        width: 90
    },
    yearsOld:{
        fontFamily: 'Montserrat',
        fontSize: 20,
        height: 40,
        color: '#333',
        marginLeft: -50,
        lineHeight: 40
    },
    descriptionBox:{
        width: '80%',
        borderTopColor: '#8c0046',
        borderTopWidth: 1,
        marginTop: 10,
        paddingTop: 10
    },
    title:{
        marginLeft: 0,
        fontFamily: 'Montserrat',
        fontSize: 16,
        width: '100%',
        marginBottom: 5
    },
    checkboxBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    checkboxText:{
        lineHeight: 33,
        fontFamily: 'Montserrat-Medium'
    },
    phoneInput:{
        backgroundColor: '#ede7e6',
        borderRadius: 8,
        marginTop: 10,
        fontFamily: 'Montserrat',
        fontSize: 14,
        height: 35,
        color: '#313131',
        width: '100%',
        padding: 5
    },
    addressBox:{
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '80%'
    },
    profissonalBox:{
        marginTop: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '80%'
    },
    descriptionInput:{
        marginTop: 10,
        padding: 5,
        width: '100%',
        textAlignVertical: "top",
        backgroundColor: '#ede7e6',
        borderRadius: 8,
        fontFamily: 'Montserrat',
        fontSize: 14,
    },
    rateText:{
        fontFamily: 'Montserrat',
        fontSize: 14,
        marginTop: 18
    },
    rateInput:{
        backgroundColor: '#ede7e6',
        borderRadius: 8,
        marginTop: 10,
        fontFamily: 'Montserrat',
        fontSize: 14,
        height: 35,
        color: '#313131',
        width: 45,
        marginLeft: 10,
        padding: 5
    },
    languagesBox:{
        width: '80%',
        marginTop: 20,
    },
    pickerButton:{
        marginTop: 10,
        height: 30,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ede7e6',
        borderColor: '#999',
        borderWidth: 0.5,
        borderRadius: 8
    },
    rowStyle:{
        borderWidth: 0.3,
        borderColor: '#999',
        borderRadius: 8,
        marginVertical: 2
    },
    pickerButtonText:{
        fontFamily: 'Montserrat'
    },
    addScheduleButton:{
        marginTop: 10,
        height: 40,
        width: 40,
        position:'absolute',
        right:10,
        top:0,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#999',
        borderWidth: 0.5,
        borderRadius: 50
    },
    subtitle:{
        fontFamily: 'Montserrat',
        fontSize: 12,
        height: 40,
        color: '#333'
    },
    saveButton:{
        backgroundColor: '#be4def',
        borderRadius: 8,
        height: 50,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
        
    },
    buttonText:{
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat-Medium'
    },
    centeredView: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
      },
    modalView: {
        backgroundColor: 'rgba(211, 230, 216, 0.9)',
        borderRadius: 20,
        height: 150,
        width: '90%',
        alignItems: "center",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    titleModal:{
        fontFamily: 'Montserrat',
        fontSize: 16,
        marginTop: 20
    },
    modalActions:{
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',   
    },
    modalAction:{
        backgroundColor: '#be4def',
        borderRadius: 8,
        height: 50,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
                
    },
    modalCloseButton:{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#e87979',
        borderRadius: 8,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
  
})

export default styles;