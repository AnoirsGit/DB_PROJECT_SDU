require('./config/config')
const express = require('express');
const db = require('./models/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT, () =>{
    console.log( "server listening:" + process.env.PORT)
})

app.get('/login', (req, res) =>{
    run().then( val => {
        res.send(val);
    })
    
})


app.post('/aouth', (req, res) =>{

})


// run()