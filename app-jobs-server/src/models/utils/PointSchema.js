const mongoose = require('mongoose');

exports.PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    }
});

exports.convertTimeToMin = function convertTimeToMin(time){
    const [hour, min] = time.split(':').map(Number);

    const timeInMin = (hour*60)+min;

    return timeInMin;
}