const BabySitter = require('../models/BabySitter');
const Review = require('../models/Review');
const Work = require('../models/Work');

module.exports = {

    async store(req, res){
        
        const {babysitter_id} = req.headers;
        const {work_id} = req.headers;

        const {message, stars} = req.body;

        console.log('store review:');
        console.log(message, stars);
        const review = await Review.create(
                                    work_id,
                                    message,
                                    stars
                                );
        if(!review){
            res.status(400).send('A problem ocurred during sending your review :( try again later!')
            return;
        }
        const work = await Work.updateReviewed(work_id);
        
        const babysitter = await BabySitter.findOne(babysitter_id);
        console.log(babysitter);
        
        const howManyReviews = babysitter.howManyReviews;
        const newHowManyReviews = howManyReviews + 1;

        const actualStars = babysitter.stars;
        console.log(actualStars);
        console.log(stars);
        console.log(howManyReviews);
        console.log(newHowManyReviews);

        
        const newStars = ((actualStars * howManyReviews) + stars) / newHowManyReviews
        console.log(newStars);
        
 
        const response = await BabySitter.updateAfterReview(babysitter_id, newHowManyReviews, newStars);
        
        res.json(review);
    },

    async index(req, res){

        const {babysitterId} = req.params;

        const reviews = await Review.find(babysitterId);

        res.json(reviews);
    }

}