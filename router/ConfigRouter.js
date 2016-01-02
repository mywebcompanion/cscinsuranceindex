/**
 * Created by ARUN on 23/12/2015.
 */

var express = require('express');
var ConfigRouter = express.Router();
var config = require('config');

ConfigRouter.get('/country', function(req,res,next){
    res.json(config.Admin.Company);
});

ConfigRouter.get('/metrics', function(req,res,next){
    res.json(config.Admin.Categories);
});

module.exports = ConfigRouter;