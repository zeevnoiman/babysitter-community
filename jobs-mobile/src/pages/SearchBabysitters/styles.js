import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    searchForm:{
        justifyContent: 'center',
        alignItems: 'center'
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
        color: '#333'
    },

})

export default styles;