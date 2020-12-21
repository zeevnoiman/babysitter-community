const db = require('../database/connection');
const { where } = require('./Review');


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

    },

    find : async function(id){
      const works = await db('work')
      .select('work.*, babysitter_schedule.year, babysitter_schedule.month_day')
      .innerJoin('babysitter_schedule', 'work.babysitter_schedule_id', 'babysitter_schedule.id')
      .whereIn('work.babysitter_id', function(){
        this.select('babysitter.id')
        .from('user')
        .innerJoin('babysitter', 'user.id', '=', 'babysitter.user_id')
        .where('user.id', id)
      })
      .orWhere('work.user_id', id)

      return works;
      
    },

    updateFinished : async function(id){
      await db('work')
      .where('id', id)
      .update({
        finished : true
      })
    }

}

module.exports = Work;