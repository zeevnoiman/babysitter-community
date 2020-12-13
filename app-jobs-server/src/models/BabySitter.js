
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
        country,
        city,
        neighborhood,
        location,
        street,
        start_hour,
        finish_hour,
        bio,
        photo,
        phone,
        languages,
        rate,
        user_id,
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
            });

            const insertedBabysitterId = insertedBabysitters[0];
 
            const insertedSchedules = await trx('babysitter_schedule').insert({
                
            })

            trx.commit();

            return insertedBabysitterId;

        } catch(err){
                await trx.rollback();

                return false
        }
    }
}


module.exports = BabySitter;