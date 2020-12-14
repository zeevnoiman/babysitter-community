
const db = require('../database/connection');


const BabySitter = {
    findOne : async function({id}){
        const babysitters = 
        await db('babysitter')
          .select('*')
          .where('id', '=', id);
      if(babysitters.length > 0){
        return babysitters[0];            
      }
      return false  
    },

    create : async function({
        name,
        age,
        email,
        gender,
        city,
        location,
        street,
        bio,
        photo,
        phone,
        languages,
        rate,
        stars = 0,
        howManyReviews = 0,
        user_id,
       schedules
    }){
        const st = db.postgis;

        try{
            const trx = await db.transaction();
 
            const insertedBabysitters = await trx('babysitter').insert({
                name,
                age,
                gender,
                email,
                city,
                street,
                location : st.setSRID(st.makePoint(location.lon, location.lat, 4326)),
                bio,
                photo,
                phone,
                languages,
                rate,
                stars,
                howManyReviews,
                user_id
            }, ['id']);

            const insertedBabysitterId = insertedBabysitters[0];

            const schedulesSerialized = schedules.map(schedule => {
                return{
                    ...schedule,
                    insertedBabysitterId
                }
            });
            await trx('babysitter_schedule').insert(schedulesSerialized);

            trx.commit();

            return insertedBabysitterId;

        } catch(err){
                await trx.rollback();

                return false
        }
    }
}


module.exports = BabySitter;