/**
 * Created by ARUN on 9/12/2015.
 */

var express = require('express');

var app = express();
app.use(express.static(__dirname +'/public'));
app.get('/', function(req,res){
    res.send("index.html");
});

app.listen(8001, function(){
    console.log("server listening in port 8001");
});