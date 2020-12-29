
const db = require('../database/connection');

const Review = {
    create : async function(work_id, message, stars){
        try{
            const insertedReviews = await db('review').insert({
                work_id,
                message,
                stars
              }, ['id'])
            return insertedReviews[0];
        } catch(err){
            console.log(err);
            return false
        }
    },

    find : async function(babysitterId){
        try{
            const reviews = 
            await db('review')
                .select(['review.id', 'user.name as user_name', 'review.message', 'review.stars as review_stars', 'babysitter.id as babysitter_id', 'babysitter.name', 'babysitter.age', 'babysitter.email', 'babysitter.city', 'babysitter.photo', 'babysitter.stars as babysitter_stars', 'babysitter.howManyReviews' ,'work.serviceDescription'])
                .innerJoin('work', 'work.id', 'review.work_id')
                .innerJoin('babysitter_schedule', 'work.babysitter_schedule_id', 'babysitter_schedule.id')
                .innerJoin('babysitter', 'babysitter_schedule.babysitter_id', 'babysitter.id')
                .innerJoin('user', 'user.id', 'work.user_id')
                .where('babysitter.id', babysitterId)

            return reviews;
        } catch(err){
            console.log(err);
            return false;
        }
    }

}
        
module.exports = Review;

