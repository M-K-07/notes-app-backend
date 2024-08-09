require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL);

const noteSchema=mongoose.Schema({
    title:String,
    note:String,
})

module.exports=mongoose.model('Notes',noteSchema)

// console.log(process.env.MONGODB_URL)