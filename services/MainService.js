/**
 * Created by ARUN on 17/1/2016.
 */

var _ = require('underscore');
var CompanyModel = require('../model/CompanyModel');
var MetricModel = require('../model/MetricModel');
var MetricsDataModel = require('../model/MetricsDataModel');
var JSONAdapter = require('../utils/JSONAdapter');
var Q = require('q');

var MainService = function(){

    var getStats = function(req,res){
        var market = req.body.market.trim();
        var company = req.body.company.trim();
        var promise = MetricsDataModel.find({ market : market, companyName : company }).exec();
        promise.then(function(data){
            var output = JSONAdapter.metricDataAdapter(data);
            res.json(output);
        });
    };

    var getAllStats = function(req,res){
        var market = req.body.market.toLowerCase().trim();
        var regex = new RegExp([ market].join(""), "i");
        var promise = MetricsDataModel.find({market: regex}).exec();
        promise.then(function(data){
            var countryMetrics = JSONAdapter.metricDataAdapter(data);
            var output = JSONAdapter.metricDataGraphAdapter(countryMetrics[market]);
            res.json(output);
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
        var promise = CompanyModel.find({companyname: companyname, countryname : countryname}).exec();
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