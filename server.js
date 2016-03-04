/**
 * Created by ARUN on 9/12/2015.
 */

var express = require('express');
var config = require('config');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = 8000;

if(config.has('Application.port')){
    port = process.env.PORT || 8080;
}

var app = express();
//mongoose.connect('mongodb://localhost/cscindex');
mongoose.connect('mongodb://csc:CscDi2@ds017158-a0.mlab.com:17158,ds017158-a1.mlab.com:17158/cscdi2?replicaSet=rs-ds017158');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());

var MainRouter = require("./router/MainRouter");
app.use('/',MainRouter);

app.on('uncaughtException', function (err) {
    console.log("UncaughtException " + err);
});

app.listen(port , function(){
    console.log("server listening in port " + port);
});