var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

app.get('/:id', (req, res) =>{
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

app.post('/:id', (res, req) => {
    console.log(req.body);
    items.push({
        id: uuidv4(), 
        description: req.body.description,
        duedate: req.body.duedate,
        isDone: req.body.isDone
    });
    res.sendStatus(201);
})

app.delete('/:id', (req, res) => {
        let foundIndex = items.findIndex(t => t.id === res.params.todoId);
    
    if(foundIndex === -1){
        res.sendStatus(404);
        return;
    }else{
        items.splice(foundIndex, 1);
        res.sendStatus(200);
    }
})

app.put('/:id', (req, res) => {
    let foundTodo = items.find(t => t.id === res.params.todoId);
    if(foundTodo){
        foundTodo.description = req.body.description;
        foundTodo.duedate = req.body.duedate;
        foundTodo.isDone = req.body.isDone;
        res.sendStatus(200);
    }
})
