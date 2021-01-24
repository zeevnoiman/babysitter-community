
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    contentContainer:{
        alignItems: 'center',
        paddingBottom: 50      
    },
    imageBox:{
        width: '100%',
        alignItems: 'flex-start'
       // height: '40%',
    },
    anonimusImage:{
        width: '100%',
        height: 250,
    },
    likeButton:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
        marginLeft: 25
    },
    starsContainer:{
        position: 'absolute',
        top: 5,
        right: 10
    },
    editProfileButton:{
        padding: 10,
        flexDirection: 'row',
        alignItems:'stretch'

    },
    name:{
        marginTop: 10,
        fontFamily: 'mama', 
        fontSize: 30,
        color: '#444'
    },
    ageBox:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    yearsOld:{
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#9338ba'
    },
    addressBox:{
        width: '80%',
        borderTopColor: '#919191',
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    text:{
        marginTop: 10,
        fontFamily: 'Montserrat',
        fontSize: 14,
        color: '#333',
        justifyContent: 'center',
        textAlign: 'justify'
    },
    profissonalBox:{
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    rateBox:{
        marginTop: 20,
        flexDirection: 'row',
        marginRight: -250
    },
    ratePrice:{
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        marginLeft: 5,
        color:'#c88802'
    },
    shekel:{
        lineHeight: 25,
        color:'#c88802'
    },
    languagesBox:{
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        borderBottomColor: '#919191',
        borderBottomWidth: 1,
        paddingBottom: 30
    },
    actions:{
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },

    action:{
        backgroundColor: '#be4def',
        borderRadius: 8,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30        
    },
    scheduleContainer:{
        width: '58%',
        alignItems: 'center',
        marginTop: 20
    },
    schedule:{
        width: '100%',
        backgroundColor: '#aff0c3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    textSchedule:{
        fontFamily: 'Montserrat',
        fontSize: 16,
        color: '#333',
        paddingVertical: 5
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
        height: 470,
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
        fontSize: 24,
        marginTop: 20,
    },
    descriptionInput:{
        marginTop: 30,
        padding: 5,
        width: '100%',
        height: 100,
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
    dateTimeInput:{
        marginTop: 10,
        width: '90%',
        alignItems: 'flex-start'
    },
    dateButton:{
        marginVertical: 5,
        height: 50,
        width: 120,
        padding: 20,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ede7e6',
        borderRadius: 8
    },
    dateText:{
        fontFamily: 'Montserrat',
        fontSize: 16,
        textAlign: 'center'
    },
    dateTextButton:{
        fontFamily: 'Montserrat'
    },
    dateButtonNew:{
        height: 30,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ede7e6',
        borderColor: '#999',
        borderWidth: 0.5,
        borderRadius: 8
    },

    modalConfirmButton: {
        backgroundColor: '#be4def',
        borderRadius: 8,
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmText:{
        fontFamily: 'Montserrat',
        color: '#fff'
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
    },
    verticalBox:{
        flexDirection: 'row'
    },
    validationMessage:{
        color: '#971300'
    },
    schedulesCard:{
        position:'absolute',
        alignSelf: 'center',
        top: 500,
        justifyContent: 'center',
        backgroundColor: '#fefefe',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        paddingBottom: 20
    },
    titleSchedules:{
        fontFamily: 'Montserrat',
        fontSize: 24,
    },
    scheduleItem: {
        marginTop: 5,
        padding: 3,
        borderTopColor: '#000',
        borderTopWidth: StyleSheet.hairlineWidth,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    schedulesHoursBox:{
        flexDirection: 'row',
    }
  
})

export default styles;