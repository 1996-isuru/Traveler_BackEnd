const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//create the schema
const hotelPackageSchema = new Schema({
    name : {
        type : String,
        required: true 
    },
    description : {
        type: String,
        required: true,
    
    },
    price : {
        type: Number,
        required: true
    },
    facilities : {
        type: String,
        required: true
    },
    picture : {
        type: String,
        required: true
    }

})

const hotelPackage = mongoose.model("hotelPackage",hotelPackageSchema);

module.exports = hotelPackage;