import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    searchForm:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput:{
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        width: '80%',
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

})

export default styles;