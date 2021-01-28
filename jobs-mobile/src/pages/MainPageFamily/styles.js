import { setAutoServerRegistrationEnabledAsync } from 'expo-notifications';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    firstLine:{
        flexDirection: 'row',
        height: 60
    },
    titleContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%'
    },
    titleBox:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    title:{
        fontFamily: 'Montserrat',
        fontSize: 26,
        color: '#80039a',
    },
    buttonv1:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    buttonv2:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#333',
        padding: 36,
        borderTopLeftRadius : 50,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7fcffa'
    },
    text:{
        fontFamily: 'Montserrat',
        fontSize: 21,
        color: '#fff',
    },
});

export default styles;