const axios = require('axios');
const BabySitter = require('../models/BabySitter');
const User = require('../models/User');

module.exports = {
    async index(req, res) {

        const {
            latitude,
            longitude,
        } = req.query;
        
        const babySitters = await BabySitter.getWithinRadius(latitude, longitude);
        const likedBabysitters = await User.showAllLikedBabysitters(req.userId);
        
        for(var i = 0; i < babySitters.length; i++){
            babySitters[i].isLiked = false
            for(var j = 0; j < likedBabysitters.length; j++){
                if(babySitters[i].id == likedBabysitters[j].babysitter_id){
                    babySitters[i].isLiked = true
                    break;
                }
            }
        }

        res.json({
            babySitters
        });

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

}