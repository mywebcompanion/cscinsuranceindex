/**
 * Created by ARUN on 23/12/2015.
 */

var express = require('express');
var MainRouter = express.Router();
var path = require('path');
var AdminRouter = require('./AdminRouter');
var MainService = require('../services/MainService')();


MainRouter.get('/', function(req,res,next){
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

MainRouter.get('/home', function(req,res,next){
   res.sendFile(path.resolve(__dirname + '/../public/home.html')); //Using ../ is considered as some kinda hack . Use path resolve
});

MainRouter.post('/home/stats', function(req,res,next){
    MainService.getStats(req,res);
});

MainRouter.use('/admin', AdminRouter);

module.exports = MainRouter;


/*
 Analytics,
 User Experience
 Social Media
 SEO & Marketing - Ads are part of marketing
 Mobility
 Suppor
 */