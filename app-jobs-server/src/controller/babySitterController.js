const axios = require('axios');
const BabySitter = require('../models/BabySitter');
const User = require('../models/User');
const authConfig = require('../config/keys');
const convertTimeToMin = require('../models/utils/convertTimeToMin');

module.exports = {

   
    async index(req, res){
        const {user_id} = req.headers;
        
        const babysitter = await BabySitter.findOne(user_id);

        console.log(babysitter);

        res.send(babysitter);
        

    },

    async store(req, res) {
        const {age, gender, country, city, street, bio, phone, languages, rate, user_id, schedules} = req.body;
        var filename = '';
        if(req.file){
             filename = req.file.filename;
        } 
        console.log(req.body);
        //get user who is opening babysitter profile
        const user = await User.findById({id : user_id});
        if(user.role != 'Nanny'){
            res.send('Only users with Nanny role can create babysitter profile')
        }
        
        //location pre proccesing
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        const fullAddress = `${street},${city},${country}`;
        var addressEncoded = encodeURIComponent(fullAddress);
        var request_url = api_url
          + '?'
          + 'q=' + addressEncoded
          + '&key=' + authConfig.apiGeoKey;

        const apiResponse = await axios.get(request_url);
          
        const pos = apiResponse.data.results.map(res => res.geometry);
          
        const location = {
            lat : pos[0].lat,
            lon : pos[0].lng
        };

        //schedules pre processing
        const schedulesParsed = JSON.parse(schedules);
        console.log(schedulesParsed, location, user_id);
        const schedulesSerialized = schedulesParsed.map(schedule => {
            const from = convertTimeToMin(schedule.from);
            const to = convertTimeToMin(schedule.to);

            return{
                ...schedule,
                from,
                to
            }
        });

        const babysitter = {
            name : user.name,
            age,
            email : user.email,
            gender,
            city,
            location,
            street,
            bio,
            photo: filename,
            phone,
            languages,
            rate,
            user_id,
            schedules : schedulesSerialized
        }

        const newBabysitter = await BabySitter.create(babysitter);
        
        return res.send({'babysitter': newBabysitter});
    },

    async update(req, res){
        const {age, gender, country, city, street, bio, phone, languages, rate, user_id, schedules} = req.body;
        const {babysitter_id} = req.params
        var filename = '';
        if(req.file){
             filename = req.file.filename;
        } 

        //location pre proccesing
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        const fullAddress = `${street},${city},${country}`;
        var addressEncoded = encodeURIComponent(fullAddress);
        var request_url = api_url
          + '?'
          + 'q=' + addressEncoded
          + '&key=' + authConfig.apiGeoKey;

        const apiResponse = await axios.get(request_url);
          
        const pos = apiResponse.data.results.map(res => res.geometry);
          
        const location = {
            lat : pos[0].lat,
            lon : pos[0].lng
        };

        //schedules pre processing
        const schedulesParsed = JSON.parse(schedules);
        console.log(schedulesParsed, location, user_id);
        const schedulesSerialized = schedulesParsed.map(schedule => {
            const from = convertTimeToMin(schedule.from);
            const to = convertTimeToMin(schedule.to);
            if(from == to){
                return false;
            }
            return{
                ...schedule,
                from,
                to
            }
        });

        const babysitter = {
            age,
            gender,
            city,
            location,
            street,
            bio,
            phone,
            languages,
            rate,
            schedules : schedulesSerialized
        }

        if(filename.length > 0){
            babysitter.photo = filename;
        }

        const updatedBabysitter = await BabySitter.update(babysitter, babysitter_id);
        
        return res.send({'babysitter': updatedBabysitter});
    }

};