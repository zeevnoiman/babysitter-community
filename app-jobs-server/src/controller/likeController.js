const User = require('../models/User');

module.exports = {
    async store(req, res){
        const {user_id} = req.headers;
        const {babysitter_id} = req.params;

        const response = await User.addLikedBabysitter(user_id, babysitter_id );

        console.log(response);
      
        res.send({isAdded : response});        
    },

    async show(req, res){
        const {user_id} = req.headers;
        
        const likedBabysitters = await User.showAllLikedBabysitters(user_id);
        console.log(likedBabysitters);
        if(likedBabysitters)
            res.json({likedBabysitters});
        else
            res.send('error in getting liked babysitters');
    },

    async delete(req, res){
        const {user_id} = req.headers;
        const {babysitter_id} = req.params;

        const response = await User.deleteLikedBabysitter(user_id, babysitter_id);

        if(response)
            res.send(user_id);
        else{
            res.send('error deleting liked babysitter')
        }
    }
}