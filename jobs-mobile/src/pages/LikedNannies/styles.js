import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
container:{
    flex: 1,
    backgroundColor: '#eee'
},
babysitterItem:{
    height: 170,
    borderColor: '#999',
    borderRadius: 8,
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
photoBox:{
    width: '45%',
    marginRight: 5
},
imageBabysitter:{
    flex: 1,
},
babysitterInfo:{
    alignItems: 'flex-start',
    paddingRight: 5,
    marginLeft: 5
},
infoText:{
    fontFamily: 'Montserrat',
    color: '#d16088',
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
    color:'#5a7a7d'
},
shekel:{
    lineHeight: 20,
    color:'#5a7a7d'
},
deleteButton:{
    position: 'absolute',
    bottom: 15,
    right: 5 
}

})

export default styles;