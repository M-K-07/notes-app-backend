const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/NotesDB')

const noteSchema=mongoose.Schema({
    title:String,
    note:String,
})

module.exports=mongoose.model('Notes',noteSchema)