import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    welcomeBox:{
        marginTop: 60,
        marginHorizontal: 30,
        alignItems: 'center',
        paddingTop: 5
    },
    welcomeTitle:{
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Montserrat'
    },
    questionToAction:{
        color: '#3c3c3c',
        fontFamily: 'Montserrat-Medium',
        alignSelf: 'center',
        fontSize: 16
    },
    actions:{
        height: '80%',
        justifyContent: 'flex-end'
    },
    loginBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    action:{
        marginTop: 10,
        backgroundColor: '#80039a',
        borderRadius: 8,
        height: 35,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -10

    },
    actionText:{
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Montserrat-Medium'
    }
})

export default styles;