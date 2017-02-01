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

//Node file-system
const fs = require('fs');

//Array for storing the files
let modelList = [];

//Set routine check for models every second
setInterval(()=>{
    //Read the model library
    readModelDir("/public/assets/models/", modelList);
}, 1000);

//////////////////////
//////SOCKET.IO///////
//////////////////////
io.on('connection', client=>{
    //Log the user to the server console
    console.log('User with the ID ' + client.id + ' has connected');

    //The user dissconnects
    client.on('disconnect', ()=>{
        //Log the user that dissconnected to the server
        console.log('User with the ID ' + client.id + ' has disconnected');
    });
});

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

//Oops, where are you looking sir?
app.get('/*', (req, res)=>{
    res.render('404.html');
});

//////////////////////////////////////////////////////////////
////Some server util functions - Cleanup before deploy////////
//////////////////////////////////////////////////////////////

function readModelDir(dirPath, listObject){ 
    //Read the folder containing the models
    fs.readdir(__dirname + dirPath, (err, files)=>{
        if(err){
            console.log('There was a problem reading the directory ' + err);
        } else {
            //Dont log the files list - useful for debugging
            //console.log(files);

            listObject = files;
        }
    });
}