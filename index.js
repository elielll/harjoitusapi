const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const express = require('express');
const bodyParser = require('body-parser');
const { Router } = require('express');
const app = express()
const port = 3000
const items = require('./routes/items')

app.use(bodyParser.json());
app.use('/items'.items)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})