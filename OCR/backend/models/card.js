const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
   name: {
    type: String,
   },
   last_name: {
    type: String,
   },
   identification_number: {
    type: String,
   },
    date_of_issue: {
    type: String,
   },
    date_of_expiry: {
    type: String,
   },
   date_of_birth: {
    type: String,
   },
   status: {
    type: Boolean,
   }
},
{timestamps: true}
);

module.exports = mongoose.model("card", cardSchema);