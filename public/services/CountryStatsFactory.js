/**
 * Created by ARUN on 15/12/2015.
 */

InsuranceIndex.factory('CountryStatsFactory', function($http,StaticResourceFactory){

    var getCountryData = function(market){
        if(market.toLowerCase() === "default"){
            market = "singapore";
        }
        return promise = $http.post('home/countrystats',{"market":market});// StaticResourceFactory.getStaticResource("json/" + market.toLowerCase() + "stats.json");
    };

    var getAllCompanies = function(){
        var promise = $http.get('/home/getAllCompanies');
        return promise;
    };

    return{
        getCountryData : getCountryData,
        getAllCompanies : getAllCompanies
    };
});