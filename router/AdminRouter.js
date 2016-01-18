/**
 * Created by ARUN on 23/12/2015.
 */

var express = require('express');
var AdminRouter = express.Router();
var AdminService = require("../services/AdminService")();
var ConfigRouter = require('./ConfigRouter');
var _ = require('underscore');

var path = require('path');

///admin/save/companyinfo

AdminRouter.use('/config',ConfigRouter);

AdminRouter.get('/', function(req,res,next){
    res.sendFile(path.resolve(__dirname + '/../public/admin.html'));
});

AdminRouter.get('/getAllMetrics', function(req,res,next){
    AdminService.getAllMetrics(res);
});
AdminRouter.get('/getValueMetrics', function(req,res,next){
    AdminService.getValueMetrics(res);
});

AdminRouter.get('/insuranceindex', function(req,res,next){
    AdminService.getInsuranceIndex(res);
});

AdminRouter.get('/companyinfo', function(req,res,next){
    AdminService.getAllCountriesInfo(res);
});

AdminRouter.get('/metricsdata', function(req,res,next){
    AdminService.getMetricsData(res);
});

AdminRouter.post('/save/companyinfo', function(req,res,next){
    var resp = AdminService.saveCompanyInfo(req.body);
    resp.then(function(){
        console.log("Hey sending status as . 201");
        res.status(201).send('Saved company  information');
    }, function(){
        res.status(500).send("Error saving company info");
    });
});

AdminRouter.post('/save/metricinfo', function(req,res,next){
    var resp = AdminService.saveMetricInfo(req.body);
    resp.then(function(){
        res.status(201).send('Saved Metrics');
    }, function(){
        console.log("Error saving metric info");
        res.status(500).send("Failed to save rating");
    });
});
AdminRouter.post('/save/benchmark', function(req,res,next){
    var resp = AdminService.saveBenchMark(req.body);
    console.log(JSON.stringify(req.body));
    resp.then(function(){
        console.log("Sending 201 back to client");
        res.status(201).send('Saved Metrics');
    }, function(){
        console.log("Error saving metric info");
        res.status(500).send("Failed to save rating");
    });

});

AdminRouter.post('/save/rating', function(req,res,next){
    console.log(JSON.stringify(req.body));
    var resp = AdminService.saveRating(req.body);
    resp.then(function(){
        console.log("Hey sending status as . 201");
        res.status(201).send('Rated company');
    }, function(){
        console.log("Error saving rating");
        res.status(500).send("Failed to save rating");
    });
});

AdminRouter.post('/delete/metricinfo', function(req,res,next){
    var resp = AdminService.deleteMetricInfo(req.body);
    resp.then(function(){
        console.log("Hey sending status as . 201");
        res.status(201).send('Deleted Metrics');
    }, function(){
        console.log("Error deleting metrics");
        res.status(500).send("Failed to delete metrics");
    });
});

AdminRouter.post('/delete/companyinfo', function(req,res,next){
    var resp = AdminService.deleteCompanyInfo(req.body);
    resp.then(function(){
        console.log("Hey sending status as . 201");
        res.status(201).send('Deleted Company');
    }, function(){
        console.log("Error deleting company info");
        res.status(500).send("Failed to delete company info");
    });
});

module.exports = AdminRouter;
