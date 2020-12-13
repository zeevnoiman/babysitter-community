const Work = require('../models/Work');
const User = require('../models/User');
const BabySitter = require('../models/BabySitter');
const {isDate,isBefore ,formatRelative, parseISO} = require('date-fns')
const { he } = require('date-fns/locale');
const { zonedTimeToUtc, format } = require('date-fns-tz');
var cron = require('node-cron');
const axios = require('axios');

cron.schedule('0 * * * *', async () => {
    const allWorks = await Work.find({finished : false});
    console.log(allWorks);
    
    const pastWorks = allWorks.filter(work => isBefore(work.date_hour_finish, new Date()))

    //console.log(pastWorks);
    const pastWorksIds = pastWorks.map(work => work._id);
    await Work.updateMany({
        _id:{ $in: pastWorksIds}
    },{
        $set:{ finished : true}
    }
    )
    const userAndNannysIds = pastWorks.map(work => ({'user': work.family,'babysitter': work.nanny}));
    const userIds = pastWorks.map(work => work.family);
    
    const Users = await User.find({
        _id: { $in: userIds }
    });
    console.log(userAndNannysIds);

    Users.map(user => {
        if(user['expoPushToken']){
            console.log(user.name);
            
            userAndNannysIds.map(async ids => {
                //console.log(user._id, ids.user);
                
                if(String(user._id) == String(ids.user)){
                    const babysitter = await BabySitter.findOne({'_id': ids.babysitter})
                    console.log(`**********running a task every hour sending to ${user.name}`);
                    sendPushNotification(user, babysitter )
                }
            })
        }
    }
    )
});

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
        
        console.log(date_hour_start_string)
        const date_hour_start = parseISO(date_hour_start_string);
        const date_hour_finish= parseISO(date_hour_finish_string);

        const babysitter = await BabySitter.findById(babysitter_id);

        if(!babysitter){
            return res.status(400).json({msg : 'employee not found'})
        }

        const newWork = {
            serviceDescription,
            date_hour_start,
            date_hour_finish,
            family : user_id,
            nanny : babysitter_id,
            defined_value_to_pay,
        }

        const work = await Work.create(newWork);
        
        res.json(work);
    },

    async index(req, res){
        const {user_id} = req.headers;

        const works = await Work.find({
            $or:[    
                {family: {$eq: user_id}},
                {nanny: {$eq: user_id}},
            ]
        });

        console.log(works);
        
        const newWorks = works.map((work) => {
            var dateHourStartReadable = ''; 
            var dateHourFinishReadable = '';
            if(isDate(work.date_hour_start)){ 
                dateHourStartReadable = format(work.date_hour_start, 'dd/MM/yyyy HH:mm:ss');
                dateHourFinishReadable = format(work.date_hour_finish, 'dd/MM/yyyy HH:mm:ss');
            }    
        
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

        const work = await Work.find({_id : work_id});

        work.finished = finished;

        work.save();
        
        res.json(work);
    }

}