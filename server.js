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
mongoose.connect('mongodb://csc:csc@ds047325.mongolab.com:47325/cscinsuranceindex');




app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static(__dirname +'/public'));
app.use(cors());




var MainRouter = require("./router/MainRouter");
app.use('/',MainRouter);

app.on('uncaughtException', function (err) {
    console.log("UncaughtException " + err);
});

app.listen(port , function(){
    console.log("server listening in port " + port);
});