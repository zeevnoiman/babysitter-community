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
    waitText:{
        fontFamily: 'Montserrat',
        color: '#333',
        marginTop: 20,
        fontSize: 32
    },
    perfil:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    imageBabysitter:{
        width: 140,
        height: 140,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff'
    },
    titleText:{
        fontSize: 26,
        fontFamily: 'Montserrat',
        color: '#80039a',
    },
    babysitterInfo:{
        alignItems: 'flex-start',
    },
    babysitterItem:{
        width: '100%',
        height: 100,
        borderColor: '#999',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'rgba(255,255, 255, 0.8)'
    },
    subtitle:{
        width:'100%',
        justifyContent: 'center',
        height: 30,
        backgroundColor: 'rgba(128, 3, 154, 0.8)',
        marginTop: 5,
    },
    subtitleText:{
        fontSize: 22,
        fontFamily: 'Montserrat',
        color: '#fff',
        marginLeft: 5
    },
    starsContainer:{
        position: 'absolute',
        top: 7,
        right: 17
    },
    infoText:{
        fontFamily: 'Montserrat',
        color: '#80039a',
        fontSize: 16,
    },
    
})

export default styles;