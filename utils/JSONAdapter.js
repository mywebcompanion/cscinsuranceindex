/**
 * Created by ARUN on 17/1/2016.
 */


var _ = require('underscore');
var prettyjson = require('prettyjson');
var JSONAdapter = {};

JSONAdapter.metricDataAdapter = function(input) {
    var output = {};

    var metricType = {"Value": "ValueMetric", "Boolean": "BooleanMetric", "Rating": "RatingMetric"};

    _.each(input, function (object) {
        var metrics = {};
        if (!output[object.market]) {
            output[object.market] = {};
        }
        _.each(object.metrics, function (metricsObj) {
            metricTypeObj = {};
            if (!metrics[metricsObj.category]) {
                metrics[metricsObj.category] = {};
            }
            if (!metrics[metricsObj.category][metricType[metricsObj.type]]) {
                metrics[metricsObj.category][metricType[metricsObj.type]] = [];
            }
            metricTypeObj["name"] = metricsObj.name;
            metricTypeObj["value"] = metricsObj.value;
            metricTypeObj["rateorder"] = metricsObj.rateorder;
            metricTypeObj["weightage"] = 100;
            if (metricType[metricsObj.type] === metricType["Value"]) {
                metricTypeObj["benchmarkvalue"] = metricsObj.benchmarkvalue;
            }
            metrics[metricsObj.category][metricType[metricsObj.type]].push(metricTypeObj);
        });
        _.each(object.recommendations, function(value,key){
            metrics[key].Recommendations = value;
        });
        output[object.market][object.companyName] = metrics;
    });

    // Part II
    var out = _.each(output, function(country){
        _.each(country, function(company){
            _.each(company, function(category){
                var valueScore = 0;
                var booleanScore = 0;
                var ratingScore = 0;
                _.each(category, function (value, type) {
                    console.log("value:",value);
                    console.log("type:", type);
                    console.log("categories", category.length);
                    var score = 0;
                    switch (type) {
                        case "ValueMetric":
                            for(i = 0; i < value.length; i++){
                                score += value[i].value / value[i].benchmarkingbvalue * value[i].weightage;
                            }
                            if(value.length > 0)
                                valueScore = score/value.length;
                            break;
                        case "BooleanMetric":
                            for(i = 0; i < value.length; i++){
                                if(value[i].value)
                                    score += 100;
                                else
                                    score += 0;
                            }
                            if(value.length > 0)
                                booleanScore = score/value.length;
                            break;
                        case "RatingMetric":
                            for(i = 0; i < value.length; i++){
                                score += value[i].value * value[i].weightage /100;
                            }
                            if(value.length > 0)
                                ratingScore = score / value.length;
                            break;
                    }
                });
                category["score"] = (valueScore + booleanScore + ratingScore) / 3;
            });
            //company["score"] = 43;
        });
    });
    console.log(out);
    return out;
};

module.exports = JSONAdapter;

