import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#eee'
    },
    loadingContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#eee'
    },
    subtitle:{
        width:'100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        // backgroundColor: 'rgba(54, 52, 52, 0.8)',
        backgroundColor: '#5a7a7d',
        marginTop: 5,
        flexDirection: 'row'
    },
    subtitleText:{
        fontSize: 16,
        fontFamily: 'Montserrat',
        color: '#fff',
        marginLeft: 5
    },
    waitText:{
        fontFamily: 'Montserrat',
        color: '#333',
        marginTop: 20,
        fontSize: 32
    },
    babysitterItem:{
        height: 100,
        borderColor: '#999',
        borderRadius: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: 'rgba(255,255, 255, 0.8)'
    },
    avatarContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    imageBabysitter:{
        width: 74,
        height: 74,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff'
    },
    babysitterInfo:{
        alignItems: 'flex-start',
        paddingRight: 5,
        marginLeft: 5
    },
    infoText:{
        fontFamily: 'Montserrat',
        color: '#363434',
        fontSize: 22,
    },
    dateRow:{
        flexDirection: 'row',
    },
    ageText:{
        fontFamily: 'Montserrat',
        color: '#333',
        fontSize: 14
    },
    rateBox:{
        flexDirection: 'row',
    },
    ratePrice:{
        fontFamily: 'Montserrat',
        fontSize: 14,
        marginLeft: 5,
        color:'#f20079'
        //color:'#c88802'
    },
    shekel:{
        lineHeight: 20,
        color:'#333'
        //color:'#c88802'
    },
    reviewButton:{
        position: 'absolute',
        bottom: 10,
        right: 5 
    },
    ReviewText:{
        fontFamily: 'Montserrat-Medium',
        color: '#c88802',
        fontSize: 14
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
        height: 300,
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
        marginTop: 20,
        marginBottom: 10
    },
    modalActions:{
        width: '100%',   
    },
    starsContainer:{
        width: 80,
    },
    reviewInput:{
        marginTop: 15,
        marginBottom: 15,
        padding: 5,
        width: '100%',
        height: 100,
        textAlignVertical: "top",
        backgroundColor: '#ede7e6',
        borderRadius: 8,
        fontFamily: 'Montserrat',
        fontSize: 14,
    },
    modalConfirmButton: {
        backgroundColor: '#5a7a7d',
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
    validationMessage:{
        color: '#971300',
        marginTop: -10
    },
    
})

export default styles;