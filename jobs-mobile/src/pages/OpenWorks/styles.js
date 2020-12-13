import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({

    container:{
        flex: 1
    },
    subtitle:{
        width:'100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'rgba(128, 3, 154, 0.8)',
        marginTop: 5,
        flexDirection: 'row'
    },
    subtitleText:{
        fontSize: 16,
        fontFamily: 'Montserrat',
        color: '#fff',
        marginLeft: 5
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
        color: '#80039a',
        fontSize: 22,
    },
    dateRow:{
        flexDirection: 'row',
    },
    ageText:{
        fontFamily: 'Montserrat',
        color: '#333',
        fontSize: 16
    },
    rateBox:{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5,
        right: 5
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
        color:'#f20079'
        //color:'#c88802'
    },
    deleteButton:{
        position: 'absolute',
        bottom: 15,
        right: 5 
    }
    
})

export default styles;