/**
 * Created by ARUN on 17/1/2016.
 */

var _ = require('underscore');
var CompanyModel = require('../model/CompanyModel');
var MetricModel = require('../model/MetricModel');
var MetricsDataModel = require('../model/MetricsDataModel');
var AdminService = require('../services/AdminService');
var JSONAdapter = require('../utils/JSONAdapter');
var Q = require('q');

var MainService = function(){

    var getStats = function(req,res){
        console.log("1");
        var market = req.body.market.trim();
        var company = req.body.company.trim();
        var regexCompany = new RegExp([ company].join(""), "i");
        var regexCountry = new RegExp([ market].join(""), "i");
        var promise = MetricsDataModel.find({ market : regexCountry, companyName : regexCompany }).exec();
        promise.then(function(data){
            console.log("2");
            var metricPromise = MetricModel.find({}).exec();
            metricPromise.then(function(metricdata){
                console.log("getMetricJSON : Successfullly fetched metrics data");
                var output = JSONAdapter.metricDataAdapter(data, metricdata);
                console.log("Response sent to client is " + JSON.stringify(output));
                res.json(output);
            }, function(err){
                console.log("getMetricJSON : Failed to fetch metrics data");
                var output = JSONAdapter.metricDataAdapter(data, []);
                console.log("Response sent to client is " + JSON.stringify(output));
                res.json(output);
            });
        });
        console.log("10");
    };

    var getAllStats = function(req,res){
        console.log("1");
        var market = req.body.market.toLowerCase().trim();
        var regex = new RegExp([ market].join(""), "i");
        var promise = MetricsDataModel.find({market: regex}).exec();
        promise.then(function(data){
            var metricPromise = MetricModel.find({}).exec();
            metricPromise.then(function(metricdata){
                console.log("getMetricJSON : Successfullly fetched metrics data");
                var countryMetrics = JSONAdapter.metricDataAdapter(data, metricdata);
                var output = JSONAdapter.metricDataGraphAdapter(countryMetrics[market]);
                console.log("Sending response " + JSON.stringify(output));
                res.json(output);

            }, function(err){
                var countryMetrics = JSONAdapter.metricDataAdapter(data, []);
                var output = JSONAdapter.metricDataGraphAdapter(countryMetrics[market]);
                console.log("Sending response " + JSON.stringify(output));
                res.json(output);
            });
        });
    };

    var getAllCompanies = function(req,res){
        var promise = CompanyModel.find().exec();
        promise.then(function(data){
            res.json(data);
        });
    };

    var getCompanyInfo = function(req,res){
        var countryname = req.body.countryname.toLowerCase();
        var companyname = req.body.companyname;
        console.log("Inside getCompanyInfo" + countryname + companyname);

        var regexCountry = new RegExp([ countryname].join(""), "i");
        var regexCompany = new RegExp([ companyname].join(""), "i");
        var promise = CompanyModel.find({companyname: regexCompany, countryname : regexCountry}).exec();
        promise.then(function(data){
            var info = {};
            if(data){
                info = data[0];
                delete info._id;
                delete info.__v;
            }

            res.json(info);
        });
    };

    return {
        getStats: getStats,
        getAllStats : getAllStats,
        getAllCompanies: getAllCompanies,
        getCompanyInfo: getCompanyInfo
    }

};

module.exports = MainService;