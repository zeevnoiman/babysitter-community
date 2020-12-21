
const db = require('../database/connection');

const Review = {
    create : async function(workId, message, stars){
        try{
            const insertedReviews = await db('review').insert({
                workId,
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
                .select(['review.*', 'babysitter.*', 'work.*'])
                .innerJoin('work', 'work.id', 'review.work_id')
                .innerJoin('babysitter_schedule', 'work.babysitter_schedule_id', 'babysitter_schedule.id')
                .innerJoin('babysitter', 'babysitter_schedule.babysitter_id', 'babysitter.id')
                .where('babysitter.id', babysitterId)

            return reviews;
        } catch(err){
            console.log(err);
            return false;
        }
    }

}
        
module.exports = Review;

