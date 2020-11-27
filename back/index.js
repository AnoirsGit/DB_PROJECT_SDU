const oracledb = require('oracledb');
const express = require('express');
const app = express();
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
connection = await oracledb.getConnection({
    user: "hr",
    password: "hr",
    // connectString: "localhost:5500" 
    connectString: "localhost/XEPDB1" 
    // connectString: "LISTENER_XE"
});
app.listen(3000, () =>{
    console.log( "server listening: 3000")
})

app.get('/login', (req, res) =>{
    run().then( val => {
        res.send(val);
    })
    
})


app.post('/aouth', (req, res) =>{

})

async function run () {
    let connection;

    try{
        
        const res =await connection.execute(
           "SELECT * FROM EMPLOYEES",
        );
        return res;
        console.log(res)
        console.log("kavo");
    }
    catch(error){
        console.log(error);
    }
    
}
// run()