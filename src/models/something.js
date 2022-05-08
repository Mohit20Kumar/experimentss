const mongoose = require("mongoose")

const mySchema = new mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    }
})

const Something = new mongoose.model("Something",mySchema)
module.exports = Something