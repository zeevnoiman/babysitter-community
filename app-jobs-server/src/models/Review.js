const mongoose = require("mongoose");

// Post Schema
const ReviewSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        babysitterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BabySitter',
            required: true
        },
        workId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Work',
            //required: true
        },
        stars:{
            type:Number,
            min:0, max:5,
            default:0
        },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Review", ReviewSchema);

