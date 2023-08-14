const express = require('express')
const path=require('path')
const app = express()

const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const cors = require('cors');
app.use(cors());
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/Contact',{useNewURLParser:true});

const port = 4000

app.set('index.html') //This set function is very important as this is used to set name to value{name:value}
//important to save data in the database

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))
 
const contactSchema = new mongoose.Schema({
    name: String,
    email:String,
    contact: String,
    contactfor:{type: String, possibleValues: ['contactforapp','contactforweb','contactforgraphic','contactfordigital']},
  });

var Contact= mongoose.model('Contact',contactSchema);
app.use("/static",express.static("static"))


app.get('/getData',async (req,res)=>{
  let data=await Contact.find();
  if(! data){
    res.send('no data get')
  }
  else{
  res.json(data)
  }
})

app.delete('/deleteData/:id',async (req,res)=>{
  console.log(req.params._id)
  await Contact.deleteOne({_id:req.params.id});
  res.send('deleted successfully')
})


app.post('/updateData',async (req,res)=>{
  await Contact.updateOne({_id:req.body.id},{$set:req.body});
  console.log(req.body)
  res.send('update successfully')
})

app.get('/download/:moviename',(req,res)=>{
  console.log('end the process')
  res.end({name:'aksahy'})
})

app.post('/addData', (req, res)=>{
    var myData = new Contact(req.body);
    console.log(myData)
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
  })
  });


  app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
  })

  app.get('/example/b', (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
  }, (req, res) => {
    res.send('Hello from B!')
  })


  const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  app.get('/example/d', [cb0, cb1], (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    res.send('hello akshay')
    next()
  }, (req, res) => {
    console.log('Hello from D!')
  })
  

  app.get('/down', function (req, res) {
    res.redirect('example/d');
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})