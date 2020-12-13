const axios = require('axios');
const BabySitter = require('../models/BabySitter');
const User = require('../models/User');
const authConfig = require('../config/keys');

module.exports = {

   
    async index(req, res){
        const {user_id} = req.params;

        
        const babysitter = await BabySitter.findOne({id : user_id});

        console.log(babysitter);

        res.send(babysitter);
        

    },

    async filter(req, res){
        const{criteria} = req.body;
        const babysitter = await BabySitter.find({
            $or:[
                {name: {$eq: criteria}},
                {city: {$eq: criteria}},
                {neighborhood: {$eq: criteria}},
                {start_hour: {$eq: criteria}},
                {finish_hour: {$eq: criteria}},
            ]});
        console.log(babysitter);
        return res.send(babysitter);
    },

    async store(req, res) {
        const {age, gender, country, city, street, bio, phone, languages, rate, user_id} = req.body;
        var filename = '';
        if(req.file){
             filename = req.file.filename;
        } 

        console.log(languages);
        const user = await User.findOne({id : user_id});
        
        
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        const fullAddress = `${street},${city},${country}`;
        var addressEncoded = encodeURIComponent(fullAddress);

        var request_url = api_url
          + '?'
          + 'q=' + addressEncoded
          + '&key=' + authConfig.apiGeoKey;


        const apiResponse = await axios.get(request_url);
          
        const pos = apiResponse.data.results.map(res => res.geometry);
          
        console.log(pos);
    
        const location = {
            lat : pos[0].lat,
            lon : pos[0].lng
        };

        const languagesArray = languages.split(',').map(language => language.trim());
        
        console.log(languagesArray);
        const babysitter = {
            name : user.name,
            age,
            email : user.email,
            gender,
            country,
            city,
            neighborhood,
            location,
            street,
            start_hour,
            finish_hour,
            bio,
            photo: filename,
            phone,
            languagesArray,
            rate,
            user_id,
        }

        console.log(babysitter);
        const newBabysitter = await BabySitter.create(babysitter);
        
        return res.send({'babysitter': newBabysitter});
    }

};