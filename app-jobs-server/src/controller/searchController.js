const axios = require('axios');
const BabySitter = require('../models/BabySitter');

module.exports = {
    async index(req, res) {

        const {
            latitude,
            longitude,
        } = req.query;

        
        const babySitters = await BabySitter.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            }
        });
        //console.log(babySitters);
        
        res.json({
            babySitters
        });

    },
}