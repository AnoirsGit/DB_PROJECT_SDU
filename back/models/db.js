const oracledb = require('oracledb');
require('../config/config')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
async function run () {
    let connection;
    connection = await oracledb.getConnection({
        user: "hr",
        password: "hr",
        // connectString: "localhost:5500" 
        connectString: process.env.CONNECT_STRING
        // connectString: "LISTENER_XE"
    });
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