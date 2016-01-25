/**
 * Created by ARUN on 17/1/2016.
 */


var _ = require('underscore');
var prettyjson = require('prettyjson');
var JSONAdapter = {};

JSONAdapter.metricDataAdapter = function(input) {
    if (!(input instanceof Array))
    {
        input = [input]
    }
    var output = {};
    var metricType = {"Value": "ValueMetric", "Boolean": "BooleanMetric", "Rating": "RatingMetric"};
    _.each(input, function (object) {
        var metrics = {};
        var market = object.market.toLowerCase();
        if (!output[market]) {
            output[market] = {};
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
            metricTypeObj["rateorder"] = metricsObj.rateorder;
            if (metricType[metricsObj.type] === metricType["Value"] && metricsObj.hasOwnProperty("benchmarkvalue")) {
                metricTypeObj["benchmarkvalue"] = metricsObj.benchmarkvalue;
            }
            metrics[metricsObj.category][metricType[metricsObj.type]].push(metricTypeObj);
        });
        if(object.hasOwnProperty("recommendations")) {
            _.each(object.recommendations, function(value,key){
                metrics[key].Recommendations = value;
            });
        }
        output[market][object.companyName] = metrics;
    });

     //Part II
    var out = _.each(output, function(country){
        _.each(country, function(company){
            var numberOfCategories = 0;
            var categoriesScore = 0;
            _.each(company, function(category){
                var valueScore = 0;
                var booleanScore = 0;
                var ratingScore = 0;
                _.each(category, function (value, type) {
                    var score = 0;
                    switch (type) {
                        case "ValueMetric":
                            for (i = 0; i < value.length; i++) {
                                if((value[i].hasOwnProperty('benchmarkvalue')) &&
                                    (parseInt(value[i].value) <= parseInt(value[i].benchmarkvalue))) {
                                    score += value[i].value / value[i].benchmarkvalue * value[i].weightage;
                                } else{
                                    score += value[i].weightage;
                                }
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
                numberOfCategories += 1;
                categoriesScore += category["score"];
            });
            if(numberOfCategories >0)
                company["score"] = categoriesScore/numberOfCategories;
            else
                company["score"] = 0;
        });
    });
    return out;
};

JSONAdapter.metricDataGraphAdapter = function(input) {
    var output = [];
    var social = {"name":"Social Media", "data": [], "color" : "#EF2525"};
    var cms = {"name":"CMS", "data": [], "color" : "#A51D13"};
    var emailChat = {"name":"Email & chat", "data": [], "color" : "#FEB300"};
    var analytics = {"name":"Analytics", "data": [], "color" : "#1A5F80"};
    var seo = {"name": "SEO & ads", "data": [], "color": "#123222"};
    var mobileUx = {"name":"Mobile & UX", "data": [], "color" : "#09395C"};
    _.each(input, function(metrics, company ){
        if(metrics.hasOwnProperty(social.name)){
            social.data.push([company,Math.round(metrics[social.name].score) / 10]);
        } else{
            social.data.push([company,0]);
        }
        if(metrics.hasOwnProperty(cms.name)){
            cms.data.push(Math.round(metrics[cms.name].score) / 10);
        } else{
            cms.data.push(0);
        }
        if(metrics.hasOwnProperty(seo.name)){
            seo.data.push(Math.round(metrics[seo.name].score) / 10);
        } else{
            seo.data.push(0);
        }
        if(metrics.hasOwnProperty(emailChat.name)){
            emailChat.data.push(Math.round(metrics[emailChat.name].score) / 10);
        } else{
            emailChat.data.push(0);
        }
        if(metrics.hasOwnProperty(mobileUx.name)){
            mobileUx.data.push(Math.round(metrics[mobileUx.name].score) / 10);
        } else{
            mobileUx.data.push(0);
        }
        if(metrics.hasOwnProperty(analytics.name)){
            analytics.data.push(Math.round(metrics[analytics.name].score) / 10);
        } else{
            analytics.data.push(0);
        }
    });
    output.push(social);
    output.push(cms);
    output.push(seo);
    output.push(emailChat);
    output.push(mobileUx);
    output.push(analytics);
    return output;
};

module.exports = JSONAdapter;