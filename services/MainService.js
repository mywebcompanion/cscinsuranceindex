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
        var market = req.body.market.trim();
        var company = req.body.company.trim();
        var regexCompany = new RegExp([ company].join(""), "i");
        var regexCountry = new RegExp([ market].join(""), "i");
        var promise = MetricsDataModel.find({ market : regexCountry, companyName : regexCompany }).exec();
        promise.then(function(data){
            console.log("Data fetched ============" + JSON.stringify(data));
            var metricPromise = MetricModel.find({}).exec();
            metricPromise.then(function(metricdata){
                console.log("getMetricJSON : Successfullly fetched metrics data");
                var output = JSONAdapter.metricDataAdapter(data, metricdata);
                res.json(output);
            }, function(err){
                console.log("getMetricJSON : Failed to fetch metrics data");
                var output = JSONAdapter.metricDataAdapter(data, []);
                console.log("Response sent to client is " + JSON.stringify(output));
                res.json(output);
            });
        });
    };

    var getComparisonReport = function(req,res){
        var market = req.body.market.trim();
        var company = req.body.company.trim();
        var metricname = req.body.metricname;
        var reverseSort = false;
        var regexCountry = new RegExp([ market].join(""), "i");
        console.log("getComparisonReport + " + "market" + regexCountry);

        var promise = MetricsDataModel.find({market: regexCountry}).exec();
        var compareStats  = [];
        promise.then(function(data){
            _.each(data, function(metricinfo){
                _.each(metricinfo.metrics, function(metric){
                    if(metric.name === metricname){
                        var metricObj = {};
                        metricObj.company = metricinfo.companyName;
                        metric.value ? metric.value : "";
                        metricObj.value = metric.value;
                        metricObj.rateorder = metric.rateorder;
                        metricObj.type = metric.type;
                        compareStats.push(metricObj);
                    }
                });
            });
            compareStats = _.sortBy(compareStats, function(obj){
                    if(obj.type === "Value" || obj.type === "Rating"){
                        obj.value = obj.value.replace(/[^\d\.]+/g,"");
                        if(obj.rateorder === "high"){
                            reverseSort = true;
                        }
                        return Number(obj.value);
                    }
                    else{
                        return obj.value === "yes";
                    }
            });
            if(reverseSort){
                compareStats = compareStats.reverse();
            }
            res.json(compareStats);
        }, function(err){
            console.log("Error fetching data from mongoDB" + err);
        });

    };

    var getAllStats = function(req,res){
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
        getCompanyInfo: getCompanyInfo,
        getComparisonReport: getComparisonReport
    }

};

module.exports = MainService;