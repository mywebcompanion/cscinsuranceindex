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
        var market = req.body.market.trim();
        var company = req.body.company.trim();
        var promise = MetricsDataModel.find({ market : market}).exec();
        promise.then(function(data){
            var output = JSONAdapter.metricDataAdapter(data);
            res.json(output);
        });

    };

    var getAllCompanies = function(req,res){
        var promise = CompanyModel.find().exec();
        promise.then(function(data){
            res.json(data);
        });
    };

    return {
        getStats: getStats,
        getAllStats : getAllStats,
        getAllCompanies: getAllCompanies
    }

};

module.exports = MainService;