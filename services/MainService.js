/**
 * Created by ARUN on 17/1/2016.
 */

var _ = require('underscore');
var CompanyModel = require('../model/CompanyModel');
var MetricModel = require('../model/MetricModel');
var MetricsDataModel = require('../model/MetricsDataModel');
var JSONAdapter = require('../utils/JSONAdapter');
var Q = require('Q');

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

    return {
        getStats: getStats
    }

};

module.exports = MainService;