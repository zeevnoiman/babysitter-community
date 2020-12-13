import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#dbd1d0'
    },
    map: {
        // flex: 1,
        height: '60%',
        width: '100%'
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff'
    },
    callout:{
        width: 100,
    },
    inCallout:{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    devName:{
        fontWeight:'bold',
        fontSize:16,
        color: '#f20079'
    },
    devBio:{
        color:'#666',
        marginTop: 5,
        marginBottom: 5
    },
    devTechs:{
        marginTop: 5,
    },
    myLocation:{
        position: 'absolute',
        left: 0,
        bottom: '45%'

    },
    searchForm:{
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 4,
            height: 4
        },
        elevation: 2,

    },

    loadButton:{
        width: 50,
        height: 50,
        backgroundColor: '#be4def',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    numberOfFounds:{
        paddingLeft: 10,
    },
    numberOfFoundsText:{
        fontFamily: 'Montserrat',
        fontSize: 16,
        lineHeight: 35,
        color: '#555'
    },
    babysittersList:{
        marginTop: 5,
    },
    babysitterItem:{
        marginBottom: 10,
        borderColor: '#999',
        borderRadius: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        backgroundColor: '#f0f0f0'
    },
    starsContainer:{
        position: 'absolute',
        right: 15,
        top: 5,
        width: 85
    },
    imageBabysitter:{
        width: 120,
        height: '100%',
        marginRight: 5
    },
    babysitterInfo:{
        height: '100%',
        width: '50%',
        alignItems: 'flex-start',
        paddingRight: 5,
        marginLeft: 5
    },
    infoText:{
        fontFamily: 'Montserrat',
        color: '#80039a',
        fontSize: 18,
        marginTop: 30
    },
    ageText:{
        fontFamily: 'Montserrat',
        color: '#333',
        marginBottom: 5,
        fontSize: 16
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
        color:'#f20079'
        //color:'#c88802'
    },
    likeButton:{      
        position: 'absolute',
        bottom: 3,
        left: 5
    },
    distanceFromUser:{
        position: 'absolute',
        bottom: 4,
        fontSize: 15,
        fontFamily: 'Montserrat',
        color: '#555'
    }

})

export default styles;