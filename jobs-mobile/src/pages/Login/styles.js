import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 60,
        alignItems: 'center',
        backgroundColor: '#dbd1d0'
    },
    helloText:{
        fontFamily: 'Montserrat',
        fontSize: 16,
        marginBottom: 20
    },
    inputBox:{
        marginTop: 10,
        height: 115,
        width: '80%',
        justifyContent: 'space-between'
    },
    textInput:{
        height: 50,
        width: '100%',
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
    messageError:{
        marginTop: 10,
        color: '#971300'
    },
    signinBox:{
        marginTop: 10
    },
    action:{
        marginTop: 30,
        backgroundColor: '#d16088',
        borderRadius: 8,
        height: 50,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,  
    },
    actionText:{
        color: '#fff',
        fontFamily: 'Montserrat',
        fontSize: 16 
    },
    signinText:{
        color: '#3c3c3c'
    }
})

export default styles;