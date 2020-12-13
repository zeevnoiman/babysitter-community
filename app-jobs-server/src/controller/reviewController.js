const BabySitter = require('../models/BabySitter');
const Review = require('../models/Review');
const Work = require('../models/Work');

module.exports = {

    async store(req, res){
        console.log(req.headers);
        
        const {babysitterid} = req.headers;
        const {userid} = req.headers;
        const {workid} = req.headers;

        const {message, stars} = req.body;

        const review = await Review.create({
                                    babysitterId : babysitterid,
                                    userId: userid,
                                    workId: workid,
                                    message,
                                    stars
                                });
        
        const work = await Work.findOne({_id : workid});
        work.reviewed = true;
        await work.save();

        const babysitter = await BabySitter.findOne({_id : babysitterid});
        console.log(babysitter);
        
        const howManyReviews = babysitter.howManyReviews;
        const newHowManyReviews = howManyReviews + 1;
        babysitter.howManyReviews  = newHowManyReviews;
        
        console.log(babysitter.howManyReviews);
        
        const actualStars = babysitter.stars;
        console.log(actualStars);
        console.log(stars);
        
        const newStars = ((actualStars * howManyReviews) + stars) / newHowManyReviews
        console.log(newStars);
        
        babysitter.stars = newStars;
 
        await babysitter.save();
        
        res.json(review);
    },

    async index(req, res){

        const {babysitterId} = req.params;

        const reviews = await Review.find({babysitterId});

        res.json(reviews);
    }

}