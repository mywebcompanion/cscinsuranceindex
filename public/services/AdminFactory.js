/**
 * Created by ARUN on 23/12/2015.
 */

var AdminFactory = AdminApp.factory('AdminFactory', function($http){
    var getCountryConfig = function(){
        var promise = $http.get('/admin/config/country');
        return promise;
    };
    var getMetricConfig = function(){
        var promise = $http.get('/admin/config/metrics');
        return promise;
    };
    var saveCompanyDetails = function(companyInfo){
        var companyDetails = {};
        angular.forEach(companyInfo, function(company){
            companyDetails[company.name] = company.data
        });
        var promise = $http.post('/admin/save/companyinfo', JSON.stringify(companyDetails));
        return promise;
    };

    var saveMetric = function(metricInfo){
        return $http.post('/admin/save/metricinfo',JSON.stringify(metricInfo));
    };
    var saveMetricsRating = function(metricData){
        return $http.post('/admin/save/rating', JSON.stringify(metricData));
    };
    return{
        getCountryConfig : getCountryConfig,
        getMetricConfig : getMetricConfig,
        saveCompanyDetails : saveCompanyDetails,
        saveMetric : saveMetric,
        saveMetricsRating : saveMetricsRating

    };
});