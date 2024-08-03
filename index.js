const express = require('express')
const app = express()
const path = require('path')
const noteModel=require('./models/notes')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
// app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/create', async (req,res)=>{
    let {title,note}=req.body;
    if(title&&note){
        const notes= await noteModel.create({title,note})
        res.redirect('/view')
    }
    else{
        res.status(400).send('Please fill all fields')
    }
})
app.get('/view',async (req,res)=>{
    let notes =await noteModel.find()
    res.render('view',{notes})
})
app.get('/delete/:noteID',async (req,res)=>{
    let note=await noteModel.findOneAndDelete({_id:req.params.noteID})
    res.redirect('/view')
})
app.get('/edit/:noteID',async (req,res)=>{
    let note=await noteModel.findOne({_id:req.params.noteID})
    res.render('edit',{note})
    console.log(note)
})
app.post('/update/:noteID', async (req,res)=>{
    let noteID=req.params.noteID
    let {title,note}=req.body;
    if(title&&note){
        const notes= await noteModel.findOneAndUpdate({_id:noteID},{title,note},{new:true})
        res.redirect('/view')
    }
    else{
        res.status(400).send('Please fill all fields')
    }
})

app.listen(3000, function () {
    console.log('server is running on port 3000')
})