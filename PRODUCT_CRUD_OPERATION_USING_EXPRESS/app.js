const express = require('express');
const app = express();
const bodyparser= require('body-parser');
const path=require('path');
// const routes = require('./router/routes.js');
const routes=require('./router/routes');


app.use(bodyparser.urlencoded({extended:false}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
// app.set('express.static(path.join(__dirname,'public')));

// app.use("/css",express.static(path.resolve(__dirname,'public/app')));
// app.use('/js',express.static(path.resolve(__dirname,'public/app')));

app.use('/',routes);

app.listen(3002,()=>{console.log("listening to the port no 3002")});

module.exports=app;