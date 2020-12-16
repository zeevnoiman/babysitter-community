const db = require('../database/connection');


const Work = {
  addWork : async function(
    serviceDescription, startTimeInMin, finishTimeInMin, defined_value_to_pay, schedule_id, user_id, finished = false, reviewed = false
    ){
      try{
        const insertedWorks = await db('work')
          .insert({
            serviceDescription,
            from : startTimeInMin,
            to : finishTimeInMin,
            defined_value_to_pay,
            babysitter_schedule_id : schedule_id,
            user_id,
            finished,
            reviewed
          }, 'id');

        return insertedWorks[0];

      } catch(err){
        return false
      }

    }

}

module.exports = Work;