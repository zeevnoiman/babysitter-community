import {StyleSheet} from 'react-native';



const styles = StyleSheet.create({
container:{
    flex: 1
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
deleteButton:{
    position: 'absolute',
    bottom: 15,
    right: 5 
}

})

export default styles;