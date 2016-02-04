/**
 * Created by ARUN on 28/12/2015.
 */

var _ = require('underscore');
var CompanyModel = require('../model/CompanyModel');
var MetricModel = require('../model/MetricModel');
var MetricsDataModel = require('../model/MetricsDataModel');
var Q = require('q');


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

    var saveBenchMark = function(benchmark, res){

        var promise1 = MetricsDataModel.find({
            metrics : {$elemMatch : {type : "Value"}}, market: benchmark.market
        }).exec();
        var promise2 = promise1.then(function(data){

            _.each(data,function(metricdata){
                metricdata.metrics = _.map(metricdata.metrics,function(metric){
                    if(benchmark[metric.name]){
                         metric.benchmarkvalue = benchmark[metric.name];
                         return metric;
                    }
                    else{
                         metric.benchmarkvalue =  metric.value;
                         return metric;
                    }
                });
                console.log( "Metrics is" + metricdata.metrics);
                return MetricsDataModel.findOneAndUpdate({_id : metricdata._id},{metrics : metricdata.metrics},function(err,data) {
                    if (err) {
                        console.log("Error updating data" + err);
                    }
                    else {
                        console.log("Updated data successfully ");
                    }
                }).exec();

            });



                //metrics : {$elemMatch : {type : "Value"}}, market: benchmark.market},refData, { multi: true }
            //);
        });
        return Q.all(promise1, promise2);
    };

    var saveMetricInfo = function(metricInfo){
        var metric= new MetricModel(metricInfo);
        return metric.save(function(err,data){
            if(err){
                console.log("Error saving metric information : " + err);
                return false;
            }
            return true;
        });
    };

    var deleteMetricInfo = function(metricInfo){
        console.log("Going to remove metrics" + JSON.stringify(metricInfo));
        return MetricModel.findOne({_id : metricInfo[0]._id},function(err,model){

            model.remove(function(err){
                if(err){
                    console.log("Error deleting metric information : " + err);
                    return false;
                }
                return true;
            });

        }).exec();
    };

    var deleteCompanyInfo = function(companyinfo){
        console.log("Going to remove company" +JSON.stringify(companyinfo));
        return CompanyModel.find({_id : companyinfo[0]._id},function(err,data){
                console.log(JSON.stringify(data));
                if(err){
                    console.log("Error deleting company information : " + err);
                    return false;
                }
                console.log("Deleted company information successfully ");
                return true;
        }).remove().exec(); //REV
    };

    var saveRating = function(rating){
        console.log("Rating is " + JSON.stringify(rating[0]));
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
                    metric.weightage = obj.weightage;
                    metric.rateorder = obj.rateorder;
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
    var getMetricJSON = function(res){
        console.log("Inside getMetricJSON");
        var promise = MetricModel.find({}).exec();
        return promise;
    };

    var getAllMetrics = function(res){
        var promise1 = MetricModel.find({}).exec();
        promise1.then(function(data){
            console.log("Successfullly fetched metrics data");
            res.status('200').json(data);

        }, function(err){
            console.log("failed to fetch metrics data" + err);
            res.status('500').send('failed to fetch metrics data');

        });
    };
    var getValueMetrics = function(res){
        var promise1 = MetricModel.find({type:"Value"}).exec();
        promise1.then(function(data){
            console.log("Successfullly fetched metrics data");
            res.status('200').json(data);

        }, function(err){
            console.log("failed to fetch metrics data" + err);
            res.status('500').send('failed to fetch metrics data');

        });
    };

    var getAllCountriesInfo = function(res){
        var promise1 = CompanyModel.find({}).exec();
        promise1.then(function(data){
            console.log("Successfullly fetched companies data");
            res.status('200').json(data);

        }, function(err){
            console.log("failed to fetch companies data" + err);
            res.status('500').send('failed to fetch companies data');

        });
    };

    var getCountryStats = function(market, res){
        var cstats = MetricsDataModel.find({market: market}).exec();
    };


    return {
        saveCompanyInfo : saveCompanyInfo,
        saveMetricInfo : saveMetricInfo,
        saveBenchMark : saveBenchMark,
        deleteMetricInfo : deleteMetricInfo,
        deleteCompanyInfo : deleteCompanyInfo,
        getMetricsData : getMetricsData,
        saveRating : saveRating,
        getAllMetrics : getAllMetrics,
        getMetricJSON : getMetricJSON,
        getValueMetrics : getValueMetrics,
        getAllCountriesInfo : getAllCountriesInfo
    };

};

module.exports = AdminService;