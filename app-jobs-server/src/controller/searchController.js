const axios = require('axios');
const BabySitter = require('../models/BabySitter');

module.exports = {
    async index(req, res) {

        const {
            latitude,
            longitude,
        } = req.query;
        
        const babySitters = await BabySitter.getWithinRadius(latitude, longitude);
        
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