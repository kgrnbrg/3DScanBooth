'use strict'

//////EXPRESS////////
const express = require('express');
const app = express();

////////HTTP/////////
const http = require('http').createServer(app);

//Port and server setup
let port = process.env.PORT || 5555;

//Server
let server = app.listen(port);

//Console the port
console.log('Server is running localhost on port: ' + port );

/////SOCKET.IO///////
const io = require('socket.io').listen(server);

////////EJS//////////
const ejs = require('ejs');

//Setup the views folder
app.set("views", __dirname + '/views');

//Setup ejs, so I can write HTML(:
app.engine('.html', ejs.__express);
app.set('view-engine', 'html');

//Setup the public client folder
app.use(express.static(__dirname + '/public'));


//////////////////////
//////ROUTER//////////
//////////////////////

//For the root folder of the client side
app.get('/', (req, res)=>{
    res.render('index.html');
});

//Admin - for uploading models to the server
app.get('/admin', (req, res)=>{
    res.render('admin.html');
});

app.get('/*', (req, res)=>{
    res.render('404.html');
});