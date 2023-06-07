const mysql=require('mysql');

 const conn= mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'pratik',
    database:'pratik',
    port:3306
})
conn.connect((err)=>{
    if(err){
        console.log(`connection failed ${err}`);
    }else{
        console.log('connection successfully');
    }
})



module.exports=conn;