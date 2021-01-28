import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        paddingTop: 40,
        alignItems: 'center',
        borderColor: '#000',
        backgroundColor: '#dbd1d0',
        flex: 1
    },
    form:{
        width: '90%',
        alignItems: 'center',
    },
    textInput:{
        height: 40,
        width: '80%',
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
        marginBottom: 20
    },
    messageText:{
        color: '#971300'
    },
    action:{
        backgroundColor: '#d16088',
        borderRadius: 8,
        height: 50,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
        
    },
    actionText:{
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat'
    }
})

export default styles;