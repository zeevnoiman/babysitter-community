const User = require('../models/User');
const BabySitter = require('../models/BabySitter');
const mongoose = require("mongoose");

module.exports = {
    async store(req, res){
        const {user_id} = req.headers;
        const {babysitter_id} = req.params;
        
        const user = await User.findOne({_id: user_id});

        console.log(user);
        const likedBabysitters = user.likedBabysitters;

        mongoose.Types.ObjectId(babysitter_id);
        
        const newLikedBabysitters = [...likedBabysitters, babysitter_id];

        user.likedBabysitters = newLikedBabysitters;

        console.log(user);
        
        await user.save();

        res.send({user});        
    },

    async show(req, res){
        const {user_id} = req.headers;

        const user = await User.findOne({_id: user_id});
        const likedBabysittersIds = user.likedBabysitters;

        const likedBabysitters = await BabySitter.find({
            _id: { $in: likedBabysittersIds }
        });

        res.send({likedBabysitters});
    },

    async delete(req, res){
        const {user_id} = req.headers;
        const {babysitter_id} = req.params;

        const user = await User.findOne({_id: user_id});

        const likedBabysitters = user.likedBabysitters;

        const newLikedBabysitters = likedBabysitters.filter(babysitter => babysitter._id != babysitter_id);

        user.likedBabysitters = newLikedBabysitters;

        await user.save();

        res.send({user});
    }
}