const db = require('../database/connection');


const BabySitter = {
    findOne : async function(id){
        const st = db.postgis;
        const babysitters = 
        await db('babysitter')
          .select('*', st.x("location").as("longitude"), st.y("location").as("latitude"))
          .where('user_id', '=', id);
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
        const trx = await db.transaction();
        
        try{

            const insertedBabysitters = await trx('babysitter').insert({
                name,
                age,
                gender,
                email,
                city,
                street,
                location : st.setSRID(st.makePoint(location.lon, location.lat), 4326),
                bio,
                photo,
                phone,
                languages,
                rate,
                stars,
                howManyReviews,
                user_id
            }, 'id');

            const insertedBabysitterId = insertedBabysitters[0];

            const schedulesSerialized = schedules.map(schedule => {
                return{
                    ...schedule,
                    babysitter_id : insertedBabysitterId
                }
            });

            await trx('babysitter_schedule').insert(schedulesSerialized);

            trx.commit();

            return insertedBabysitterId;

        } catch(err){
                await trx.rollback();
                console.log(err);
                return false
        }
    },

    update : async function({
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
       schedules
    }, babysitter_id){
        const st = db.postgis;
        const trx = await db.transaction();
        
        try{

            const insertedBabysitters = await trx('babysitter')
            .where('babysitter_id', babysitter_id)
            .update({
                name,
                age,
                gender,
                email,
                city,
                street,
                location : st.setSRID(st.makePoint(location.lon, location.lat), 4326),
                bio,
                photo,
                phone,
                languages,
                rate,
            }, 'id');

            const schedulesSerialized = schedules.map(schedule => {
                return{
                    ...schedule,
                    babysitter_id : babysitter_id
                }
            });

            await trx('babysitter_schedule').insert(schedulesSerialized);

            trx.commit();

            return updatedBabysitterId;

        } catch(err){
                await trx.rollback();
                console.log(err);
                return false
        }
    },
    getSchedule : async function(babysitter_id, year, month_day, from, to){
        try{

            const scheduleId = 
                await db('babysitter_schedule')
                .select('id')
                .where('babysitter_id', babysitter_id)
                .andWhere('year', year)
                .andWhere('month_day', month_day)
                .andWhere('from', '<=', from)
                .andWhere('to', '>=', to);

            return scheduleId[0].id;
        } catch(err){
            return false
        }
    },

    getWithinRadius :async function(latitude, longitude){
        const st = db.postgis;
        try{
            const babysitters = await db("babysitter")
            .select('babysitter.*', st.distance("location", st.geography(st.makePoint(longitude, latitude))).as("distanceAway"))
            .where(st.dwithin("location", st.geography(st.makePoint(longitude, latitude)), 50000));

            return babysitters;
        } catch(err){
            console.log(err);
            return false;
        }
    },

    updateAfterReview : async function(id, howManyReviews, stars){
        try{
            await db('babysitter')
            .where('id', id)
            .update({
                howManyReviews : howManyReviews,
                stars : stars
            })
            return true
          } catch(err){
            console.log(err);
            return false
          }
    }
}


module.exports = BabySitter;