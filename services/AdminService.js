/**
 * Created by ARUN on 28/12/2015.
 */

var _ = require('underscore');
var CompanyModel = require('../model/CompanyModel');
var MetricModel = require('../model/MetricModel');
var MetricsDataModel = require('../model/MetricsDataModel');
var Q = require('Q');


var AdminService = function(){

    var saveCompanyInfo = function(companyInfo){
        console.log(companyInfo);
        var company = new CompanyModel(companyInfo);
        return company.save(function(err,data){
            if(err){
                console.log("Error save company information : " + err);
                return false;
            }

            return true;
        });

    };

    var saveMetricInfo = function(metricInfo){
        console.log(metricInfo);
        var metric= new MetricModel(metricInfo);
        return metric.save(function(err,data){
            if(err){
                console.log("Error saving metric information : " + err);
                return false;
            }
            return true;
        });
    };

    var saveRating = function(rating){
        var mrating = new MetricsDataModel(rating[0]);
        return mrating.save(function(err,data){
            if(err){
                console.log("Error saving rating information : " + err);
                return false;
            }
            return true;
        });
    };

    var getDefaultMetricValue = function(type){
        if(type === " boolean"){
            return false;
        }
        else if(type === "value"){
            return "";
        }
        else if (type === "rating"){
            return 0;
        }
    };

    var getMetricsData = function(res){
        var promise1 =  CompanyModel.find({}).exec();
        var promise2 = MetricModel.find({}).exec();
        var promise3 = MetricsDataModel.find({}).exec();
        Q.all([promise1, promise2, promise3]).spread(function(companyInfo, MetricInfo, MetricsData){
            var metricDataSet = [];

            _.each(companyInfo, function(company){
                var dataRep = {
                    "companyName" : "",
                    "market" : "",
                    "metrics" : []
                };
                dataRep.companyName = company.companyname;
                dataRep.market = company.countryname;


                _.each(MetricInfo, function(obj){
                    var metric = {};
                    metric.name = obj.name;
                    metric.type = obj.type;
                    metric.category = obj.category;
                    metric.value = "";
                    var cdata = _.findWhere(MetricsData, {companyinfoid : company._id});

                    if(cdata && cdata[metric.name]){
                        metric.value = cdata.value;
                    }
                    dataRep.metrics.push(metric);
                });
                metricDataSet.push(dataRep);
            });
            res.json( metricDataSet);
        });
    };


    return {
        saveCompanyInfo : saveCompanyInfo,
        saveMetricInfo : saveMetricInfo,
        getMetricsData : getMetricsData,
        saveRating : saveRating
    };

};

module.exports = AdminService;