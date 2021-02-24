//starting point

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');
var userRoute = require('./routes/user.route');

mongoose.connect(config.dbUrl);
mongoose.connection.on('connected',()=>{
    console.log('Connected to Mongo Database');
});

mongoose.connection.on('error',err=>{
console.log('Error at Mongo Database'+ err);
});


var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use('/users',userRoute);



app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

var server = http.createServer(app);
server.listen(port, () =>{
    console.log('Server is starting = '+ port);
});
