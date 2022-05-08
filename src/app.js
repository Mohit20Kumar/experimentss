const connectDB = require("./db/conn")
require('dotenv').config()
const express = require('express')
const async = require('hbs/lib/async')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
const Something = require("./models/something")

// paths
const staticPath = path.join(__dirname,"../public")

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(staticPath))
app.set("view engine","hbs")



app.get("/",async (req,res)=>{
    try {
        // console.log(Something.somethings); 
        const data = await Something.find()
        // console.log(data);
        res.render("index",{data})
    } catch (error) {
        console.log(error);   
    }
})

app.get("/form", (req,res)=>{

    res.render("form.hbs")
})

app.post("/formdone",async (req,res)=>{
    try {
        const fname = req.body.fname
        const lname = req.body.lname
        console.log(fname,lname);

        const newSomething = new Something({
            fname:fname,
            lname:lname
        })
        const done = await newSomething.save()
        res.status(200).render("formdone")
    } catch (error) {
        res.status(400).send(error)
    }
})




const start = async ()=>{
    try {
           await connectDB(process.env.MONGO_URI) 
            app.listen(port,()=>{
            console.log("listening to server....");
})        
    } catch (error) {
        console.log(error);
    }
}

start()
