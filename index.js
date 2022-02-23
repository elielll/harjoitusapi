const { v4: uuidv4 } = require('uuid');
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
//const { Router } = require('express');
const app = express()
const port = 3000
//const items = require('./routes/items');
const { session } = require('passport');
//const jwt = require('jsonwebtoken');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })




app.use(bodyParser.json());
//app.use('/items', items)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//tarkistetaan onko käyttäjän antamat tiedot oikein
passport.use(new BasicStrategy(
    function (username, password, done){

        console.log(username+" "+ password);
        let user = users.find(user => (user.username === username) &&  (bcrypt.compareSync(password,user.password)));
        if(user!=undefined){
          done(null, {});
        }
        else{
          done(null, false);
        }
    }
));



app.post('/items/:itemid', upload.single('image'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    let foundItem = items.find(t => t.id === req.params.itemid);
    console.log('req.file');
    console.log(req.file);
      
        if (foundItem.image1 == ""){
            foundItem.image1 = req.file;
        } else if(foundItem.image2 == ""){
            foundItem.image2 = req.file;
        } else if(foundItem.image3 == ""){
            foundItem.image3 = req.file;
        } else if (foundItem.image4 == ""){
            foundItem.image4 = req.file;
        } else {
            res.sendStatus(400);
        }
        
        res.sendStatus(200);
})

const users = [];
//luodaan käyttäjä
app.post('/users', (req, res) => {
    console.log("Post user");
    const salt = bcrypt.genSaltSync(6);
    console.log('salt:' + salt)
    const hashedPassword=bcrypt.hashSync(req.body.password, salt);


    const user = {
        id: uuidv4(), 
        username: req.body.username,
        password: hashedPassword,
        email:req.body.email
    }
    users.push(user);
    res.sendStatus(201);
})

// kirjautuminen, jotta päästään tulostaan consoliin, pitää käydä passport midlewaren kautta
app.post('/login', passport.authenticate('basic', {session: false}),(req,res) =>{
    console.log("suojattu reitti");
    res.json({status: "ok toimii"});
})
 

const items = [];
//luodaan uusi ilmoitus
app.post('/items', (req, res) => {
    
    const item = {
        id: uuidv4(),
        Tittle: req.body.Tittle,
        Description: req.body.Description,
        Category: req.body.Category,
        Location: req.body.Location,
        AskingPrice: req.body.AskingPrice,
        DateOfPosting: req.body.DateOfPosting,
        DeliveryType: req.body.DeliveryType,
        ContactInformation: req.body.ContactInformation,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        image4: req.body.image4
    }
    items.push(item);
    console.log(items);
    res.sendStatus(201);
})

//Hakee kaikki tavarat
app.get('/item', (req, res) => {
    res.json(items);
})



//Tän pitäs pystyä hakemaan categorian perusteella items taulukosta ilmoituksia
app.get('/item/testi', (req, res) => {

    //res.send(req.query.Category);
    
    let foundIndex = -1;
    for(let i = 0; i < items.length; i++) {
        if (items[i].Category === req.query.Category) {
            foundIndex = i;
            
        }
        else if(items[i].Location === req.query.Location){
            foundIndex = i;
        
        }
        else if(items[i].DateOfPosting === req.query.DateOfPosting){
            foundIndex = i;
        
        }
    }
    if(foundIndex === -1) {
        res.sendStatus(404);
    } else {
        res.json(items[foundIndex]);
    }
    
});

//hakee tavaran id:n perusteella 
app.get('/item/:itemid', (req, res) => {
    let foundIndex = -1;
   for(let i = 0; i < items.length; i++) {
       if(items[i].id === req.params.itemid) {
           foundIndex = i;
           break;
       }
   }

    if(foundIndex === -1) {
        res.sendStatus(404);
    } else {
        res.json(items[foundIndex]);
    }
})

app.put('/items/:itemid', (req, res) => {
    let foundItem = items.find(t => t.id === req.params.itemid);

    if(foundItem){
        foundItem.Tittle = req.body.Tittle;
        foundItem.Description = req.body.Description;
        foundItem.Category = req.body.Category;
        foundItem.Location = req.body.Location;
        foundItem.AskingPrice = req.body.AskingPrice;
        foundItem.DateOfPosting = req.body.DateOfPosting;
        foundItem.DeliveryType = req.body.DeliveryType;
        foundItem.ContactInformation = req.body.ContactInformation;
        foundItem.image1 = req.body.image1;
        foundItem.image2 = req.body.image2;
        foundItem.image3 = req.body.image3;
        foundItem.image4 = req.body.image4;

        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

app.delete('/items/:itemsid', (req, res) => {
    let foundIndex = items.findIndex(t => t.id === req.params.itemsid);
     
    if(foundIndex === -1) {
             res.sendStatus(404);
    } else {
             items.splice(foundIndex, 1);
             res.sendStatus(202);
    }

})
//tässä mitä oli items.js sisällä. Piti ottaa pois ku ei toiminu  
/*
var express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/:id', (req, res) =>{
    let foundIndex = -1;
    for(let i = 0; i < items.lenghtM; i++){
        if(items[i].id === req.params.todoId){
            foundIndex = i;
            break;
        }
    }

    if(foundIndex === -1){
        res.sendStatus(404);
        return;
    }else{
        res.json(items[foundIndex]);
    }
})

router.post('/:id', (res, req) => {
    console.log(req.body);
    items.push({
        id: uuidv4(), 
        description: req.body.description,
        duedate: req.body.duedate,
        isDone: req.body.isDone
    });
    res.sendStatus(201);
})

router.delete('/:id', (req, res) => {
        let foundIndex = items.findIndex(t => t.id === res.params.todoId);
    
    if(foundIndex === -1){
        res.sendStatus(404);
        return;
    }else{
        items.splice(foundIndex, 1);
        res.sendStatus(200);
    }
})

router.put('/:id', (req, res) => {
    let foundTodo = items.find(t => t.id === res.params.todoId);
    if(foundTodo){
        foundTodo.description = req.body.description;
        foundTodo.duedate = req.body.duedate;
        foundTodo.isDone = req.body.isDone;
        res.sendStatus(200);
    }
})
module.exports = router

*/