/**
 * Created by ARUN on 15/12/2015.
 */

InsuranceIndex.factory('CountryStatsFactory', function($http,StaticResourceFactory){

    var getCountryData = function(countryname){
        if(countryname.toLowerCase() === "default"){
            countryname = "singapore";
        }
        return promise = StaticResourceFactory.getStaticResource("json/" + countryname.toLowerCase() + "stats.json");
    };
    return{
        getCountryData : getCountryData
    };
});