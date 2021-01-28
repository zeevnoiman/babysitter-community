import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#eee'
    },
    searchForm:{
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    inputBox:{
        flexDirection: 'row',
    },
    searchInput:{
        height: 36,
        backgroundColor: '#fff',
        color: '#333',
        marginRight: 20,
        marginBottom: 8,
        marginTop: 8,
        width: '40%',
        borderRadius: 8,
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

    sliderLabelContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subtitle:{
        fontFamily: 'Montserrat',
        fontSize: 16,
        marginTop: 8,
        color: '#eee'
    },
    checkboxContainer:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10

    },
    checkboxBox:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    checkboxText:{
        lineHeight: 33,
        fontFamily: 'Montserrat-Medium'
    },
    LayoutAnimationButton:{
        alignSelf: 'center',
        padding: 5,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: '#d16088'
    },
    searchButton:{
        alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: 3,
        justifyContent: 'center',
        alignItems:'center',
        padding: 5,
        // borderWidth: 1,
        // borderColor : '#333',
        borderRadius: 100
    },
    babysitterItem:{
        height: 200,
        borderColor: '#999',
        borderRadius: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: 'rgba(255,255, 255, 0.8)'
    },
    starsContainer:{
        position: 'absolute',
        right: 15,
        top: 5,
        width: 85
    },
    imageBabysitter:{
        height: '100%',
        width: 120,
        marginRight: 5
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

})

export default styles;