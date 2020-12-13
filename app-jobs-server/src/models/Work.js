const {Schema, model} = require("mongoose");


// Create Schema
const WorkSchema = new Schema({
  serviceDescription: {
    type: String,
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nanny: {
    type: Schema.Types.ObjectId,
    ref: 'BabySitter',
    required: true
  },
  date_hour_start: Date,
  date_hour_finish: Date,
  finished:{
      type: Boolean,
      default: false,
  },
  reviewed:{
    type: Boolean,
    default: false,
  }, 
  defined_value_to_pay: Number,
},
  {
    timestamps: true
  });


module.exports = model("Work", WorkSchema);