/**
 * Created by ARUN on 17/1/2016.
 */


var _ = require('underscore');
var prettyjson = require('prettyjson');
var trim = require('trim');
var JSONAdapter = {};


    JSONAdapter.metricDataAdapter = function(input, metricdb) {

        computeBenchMark(input);
    if (!(input instanceof Array))
    {
        input = [input]
    }
    var output = {};
    var metricType = {"Value": "ValueMetric", "Boolean": "BooleanMetric", "Rating": "RatingMetric"};
    _.each(input, function (object) {
        var metrics = {};
        var market = object.market.toLowerCase();
        if(object.url){
            output.url = object.url.toLowerCase();
        }

        if (!output[market]) {
            output[market] = {};
        }
        _.each(object.metrics, function (metricsObj) {
            var metricRec = _.findWhere(metricdb, {name : metricsObj.name});


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

            if(metricRec.weightage){
                metricTypeObj["weightage"] = metricRec.weightage;
            } else{
                metricTypeObj["weightage"] = 100;
            }
            if(metricRec.icon){
                metricTypeObj["icon"] = metricRec.icon;
            } else{
                metricTypeObj["icon"] = "fa fa-cog";
            }
            if(metricRec.iconcolor){
                metricTypeObj["iconcolor"] = metricRec.iconcolor;
            } else{
                metricTypeObj["iconcolor"] = "#ccc";
            }
            if (metricType[metricsObj.type] === metricType["Value"] && metricsObj.hasOwnProperty("benchmarkvalue")) {
                if(metricsObj.benchmarkvalue > 0 )
                metricTypeObj["benchmarkvalue"] = metricsObj.benchmarkvalue;
            }
            else if(metricType[metricsObj.type] === metricType["Value"] && !metricsObj.hasOwnProperty("benchmarkvalue")){
                if(object.market && benchMarkData[object.market] &&  benchMarkData[object.market][metricsObj.name] ){
                    metricTypeObj["benchmarkvalue"] = benchMarkData[object.market][metricsObj.name].maxval;
                }
            }


            metrics[metricsObj.category][metricType[metricsObj.type]].push(metricTypeObj);
        });
        if(!_.isEmpty(object.recommendations)) {
            _.each(object.recommendations, function(value,key){
                value = _.map(value, function(val){
                    val = trim(val).replace(/\s+/g,' ').replace(/\/n/g,'');
                    return val;
                });
                metrics[key].Recommendations = value;
            });
        }
        else{

        }
        output[market][object.companyName] = metrics;
    });

     //Part II
    var out = _.each(output, function(country){
        _.each(country, function(company){
            var numberOfCategories = 0;
            var categoriesScore = 0;
            _.each(company, function(category){
                var score = 0;
                var weightage = 0;
                _.each(category, function (value, type) {
                    switch (type) {
                        case "ValueMetric":
                            for (i = 0; i < value.length; i++) {
                                if((value[i].hasOwnProperty('benchmarkvalue')) &&
                                    (parseInt(value[i].value) <= parseInt(value[i].benchmarkvalue))) {
                                    score += value[i].value / value[i].benchmarkvalue * value[i].weightage;
                                } else{
                                    score += value[i].weightage;
                                }
                                weightage += value[i].weightage;
                            }

                            break;
                        case "BooleanMetric":
                            for(i = 0; i < value.length; i++){
                                if(value[i].value === "yes")
                                    score += value[i].weightage;
                                else
                                    score += 0;
                                weightage += value[i].weightage;
                            }

                            break;
                        case "RatingMetric":
                            for(i = 0; i < value.length; i++){
                                score += value[i].value * value[i].weightage / 100;
                                weightage  += value[i].weightage;
                            }
                            break;
                    }
                });
                category["score"] = score / weightage * 100;
                category["score"] = Math.round(category["score"]) / 10;
                numberOfCategories += 1;
                categoriesScore += category["score"];

            });
            if(numberOfCategories >0)
                company["score"] = Math.round(categoriesScore/6*10)/10;
            else
                company["score"] = 0;
        });
    });
    return out;
};

JSONAdapter.metricDataGraphAdapter = function(input) {
    var output = [];
    var social = {"name":"social", "data": [], "color" : "#EF2525"};
    var cms = {"name":"CMS", "data": [], "color" : "#A51D13"};
    var emailChat = {"name":"Email & chat", "data": [], "color" : "#FEB300"};
    var analytics = {"name":"Analytics", "data": [], "color" : "#1A5F80"};
    var seo = {"name": "SEO & ads", "data": [], "color": "#123222"};
    var mobileUx = {"name":"Mobile & UX", "data": [], "color" : "#09395C"};
    _.each(input, function(metrics, company ){
        if(metrics.hasOwnProperty(social.name)){
            social.data.push([company,metrics[social.name].score]);
        } else{
            social.data.push([company,0]);
        }
        if(metrics.hasOwnProperty(cms.name)){
            cms.data.push(metrics[cms.name].score);
        } else{
            cms.data.push(0);
        }
        if(metrics.hasOwnProperty(seo.name)){
            seo.data.push(metrics[seo.name].score);
        } else{
            seo.data.push(0);
        }
        if(metrics.hasOwnProperty(emailChat.name)){
            emailChat.data.push(metrics[emailChat.name].score);
        } else{
            emailChat.data.push(0);
        }
        if(metrics.hasOwnProperty(mobileUx.name)){
            mobileUx.data.push(metrics[mobileUx.name].score);
        } else{
            mobileUx.data.push(0);
        }
        if(metrics.hasOwnProperty(analytics.name)){
            analytics.data.push(metrics[analytics.name].score);
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

var benchMarkData = {};
var computeBenchMark = function(input){
    _.each(input, function(data){
        var key = data.market;
        var metrickey = "metricRoot";
        if(!benchMarkData.hasOwnProperty(key)){
            benchMarkData[key] = {metrickey : {}};
        }
        _.each(data.metrics, function(metric){
            if(metric.type === "Value" && metric.value){
                metric.value = metric.value.replace(/[^\d\.]+/g,"");
            }

            if(metric.type === "Value"){
                if(!benchMarkData[key].hasOwnProperty(metric.name)){
                    if(metric.value && metric.value > 0){
                        benchMarkData[data.market][metric.name] = {
                            "maxval": metric.value,
                            "minval": metric.value,
                            "rateorder" : metric.rateorder
                        }
                    }

                }
                else{
                    if(metric.value && metric.value > benchMarkData[data.market][metric.name]["maxval"]){
                        benchMarkData[data.market][metric.name]["maxval"] = metric.value;
                    }
                    else if(metric.value  && metric.value < benchMarkData[data.market][metric.name]["minval"]){
                        benchMarkData[data.market][metric.name]["minval"] = metric.value;
                    }
                }
            }
        });
    });
    console.log("BenchmarkData========" + JSON.stringify(benchMarkData));
}

module.exports = JSONAdapter;