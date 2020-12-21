const converTimeToMin = require('../models/utils/convertTimeToMin');
const convertMinToTime = require('../models/utils/convertMinToTime');
const Work = require('../models/Work');
const User = require('../models/User');
const BabySitter = require('../models/BabySitter');
const {isDate,isBefore ,formatRelative, parseISO} = require('date-fns')
const { he } = require('date-fns/locale');
const { zonedTimeToUtc, format } = require('date-fns-tz');
var cron = require('node-cron');
const axios = require('axios');

// cron.schedule('0 * * * *', async () => {
//     const allWorks = await Work.find({finished : false});
//     console.log(allWorks);
    
//     const pastWorks = allWorks.filter(work => isBefore(work.date_hour_finish, new Date()))

//     //console.log(pastWorks);
//     const pastWorksIds = pastWorks.map(work => work._id);
//     await Work.updateMany({
//         _id:{ $in: pastWorksIds}
//     },{
//         $set:{ finished : true}
//     }
//     )
//     const userAndNannysIds = pastWorks.map(work => ({'user': work.family,'babysitter': work.nanny}));
//     const userIds = pastWorks.map(work => work.family);
    
//     const Users = await User.find({
//         _id: { $in: userIds }
//     });
//     console.log(userAndNannysIds);

//     Users.map(user => {
//         if(user['expoPushToken']){
//             console.log(user.name);
            
//             userAndNannysIds.map(async ids => {
//                 //console.log(user._id, ids.user);
                
//                 if(String(user._id) == String(ids.user)){
//                     const babysitter = await BabySitter.findOne({'_id': ids.babysitter})
//                     console.log(`**********running a task every hour sending to ${user.name}`);
//                     sendPushNotification(user, babysitter )
//                 }
//             })
//         }
//     }
//     )
// });

const sendPushNotification = async (user, nanny) => {
    const message = {
      to: user.expoPushToken,
      sound: 'default',
      title: `Hi ${user.name}, how was the nanny visit?`,
      body: `Leave a review to ${nanny.name}!`,
      data: {'babysitterId': nanny._id},
      _displayInForeground: true,
    };
    const response = await axios.post('https://exp.host/--/api/v2/push/send', JSON.stringify(message), {
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
    });
  };

module.exports = {
    async store(req, res){
        const { babysitter_id } = req.params;
        const {user_id} = req.headers;
        const {serviceDescription ,date_hour_start_string, date_hour_finish_string, defined_value_to_pay,  } = req.body;
        
        //pre processing of time
        //format of date_hour_*_string : yyyy-MM-dd HH:mm:ss
        console.log(date_hour_start_string)
        const date_hour_start = new Date(date_hour_start_string);
        const date_hour_finish = new Date(date_hour_finish_string);

        const day = date_hour_start.getDate();
        const month = date_hour_start.getMonth() + 1; //js month -> 0 - 11, I want -> 1 - 12
        const year = date_hour_start.getFullYear();
        const month_day = `${month}_${day}`;
        
        const startHour = date_hour_start.getHours();
        const startMin = date_hour_start.getMinutes();
        const startTime = `${startHour}:${startMin}`;
        const startTimeInMin = converTimeToMin(startTime);

        const finishHour = date_hour_finish.getHours();
        const finishMin = date_hour_finish.getMinutes();
        const finishTime = `${finishHour}:${finishMin}`;
        const finishTimeInMin = converTimeToMin(finishTime);

        const schedule_id = await BabySitter.getSchedule(babysitter_id, year, month_day, startTimeInMin, finishTimeInMin);

        if(schedule_id){
            const work_id = await Work.addWork(serviceDescription, startTimeInMin, finishTimeInMin, defined_value_to_pay, schedule_id, user_id);
            res.send({work : work_id})
        }

        res.send('No open schedule for this babysitter in that time');
    },

    async index(req, res){
        const {user_id} = req.headers;

        const works = await Work.find( user_id );

        console.log(works);
        
        const newWorks = works.map((work) => {
            const from = convertMinToTime(work.from);
            const to = convertMinToTime(work.to);
            const [month, day] = work.month_day.split('_');
            const year = work.year;
            var dateHourStartReadable = `${day}/${month}/${year} ${from}`; 
            var dateHourFinishReadable = `${day}/${month}/${year} ${to}`;
                
            const newWork =  {...work._doc, dateHourStartReadable, dateHourFinishReadable}
            console.log(newWork);
            return newWork           
        })
        
        console.log(newWorks);
        
        res.json(newWorks);
    },

    async update(req, res){
        const {work_id} = req.headers;
        const {finished} = req.query;

        const work = await Work.updateFinished(work_id);

        
        res.json(work);
    }

}