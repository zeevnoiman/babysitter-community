const BabySitter = require('../models/BabySitter');
const Review = require('../models/Review');
const Work = require('../models/Work');

module.exports = {

    async store(req, res){
        console.log(req.headers);
        
        const {babysitterid} = req.headers;
        const {workid} = req.headers;

        const {message, stars} = req.body;

        const review = await Review.create(
                                    workid,
                                    message,
                                    stars
                                );
        if(!review){
            res.send('A problem ocurred during sending your review :( try again later!')
            return;
        }
        const work = await Work.updateReviewed(workid);
        
        const babysitter = await BabySitter.findOne(babysitterid);
        console.log(babysitter);
        
        const howManyReviews = babysitter.howManyReviews;
        const newHowManyReviews = howManyReviews + 1;

        const actualStars = babysitter.stars;
        console.log(actualStars);
        console.log(stars);
        
        const newStars = ((actualStars * howManyReviews) + stars) / newHowManyReviews
        console.log(newStars);
        
 
        const response = await Babysitter.UpdateAfterReview(babysitterid, newHowManyReviews, newStars);
        
        res.json(review);
    },

    async index(req, res){

        const {babysitterId} = req.params;

        const reviews = await Review.find(babysitterId);

        res.json(reviews);
    }

}