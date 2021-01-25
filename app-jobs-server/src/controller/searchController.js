const axios = require('axios');
const BabySitter = require('../models/BabySitter');
const User = require('../models/User');
const convertTimeToMin = require('../models/utils/convertTimeToMin');

module.exports = {
    async index(req, res) {
        const {
            latitude,
            longitude,
        } = req.query;
        
        console.log(req.userId);
        const babySitters = await BabySitter.getWithinRadius(latitude, longitude);
        const likedBabysitters = await User.showAllLikedBabysitters(Number(req.userId.id));
        
        for(var i = 0; i < babySitters.length; i++){
            babySitters[i].isLiked = false
            for(var j = 0; j < likedBabysitters.length; j++){
                if(babySitters[i].id == likedBabysitters[j].babysitter_id){
                    babySitters[i].isLiked = true
                    break;
                }
            }
        }

        res.json({
            babySitters
        });

    },

    
    async filter(req, res){
        const{criterias, babysitter_name, city, schedule, range} = req.query;

        const criteriasList = criterias.split(',').map(value => value.trim())

        let schedulesParsed
        let from, to
        if(schedule){
            schedulesParsed = JSON.parse(schedule);
            from = convertTimeToMin(schedulesParsed.from);
            to = convertTimeToMin(schedulesParsed.to);
        }

        let rangeParsed;
        if(range){
            rangeParsed = range.split(',').map(value => value.trim())
        }

        const filters = {
            babysitter_name : async () => (await BabySitter.getByName(babysitter_name)),
            city : async () => (await BabySitter.getByCity(city)),
            schedule : async () => (await BabySitter.getScheduleInTheTime(schedulesParsed.year, schedulesParsed.month_day, from, to)),
            range : async () => (await BabySitter.getByRate(rangeParsed)),
        }
        
        const babysittersPromisses = criteriasList.map(criteria => (
            filters[criteria]()
        ))

        const babysittersLists = await Promise.all(babysittersPromisses);
        const lengthOfArrays = babysittersLists.map(babysitters => babysitters.length)
        const maxLenght = Math.max(...lengthOfArrays);
        const maxLenghtIndex = lengthOfArrays.indexOf(maxLenght);

        let commonBabysitters, minCommonBabysitters;
        minCommonBabysitters = babysittersLists[maxLenghtIndex];
        for(var i = 0; i < babysittersLists.length; i++){
            if(i == maxLenghtIndex){
                continue;
            }
            commonBabysitters = babysittersLists[maxLenghtIndex].filter(babysitter => {
                if(babysittersLists[i].length == 0){
                    return false
                }
                let contains = false
                for(var j = 0; j < babysittersLists[i].length; j++){
                    if(babysitter.id == babysittersLists[i][j].id){
                        contains = true
                    }
                }
                return contains;
            })
            if(commonBabysitters.length < minCommonBabysitters.length){
                minCommonBabysitters = commonBabysitters;
            }
        }

        return res.send(minCommonBabysitters);
    },

}