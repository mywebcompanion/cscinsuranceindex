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

    var getAllCompanies = function(){
        var promise = $http.get('/home/getAllCompanies');
        return promise;
    };

    return{
        getCountryData : getCountryData,
        getAllCompanies : getAllCompanies
    };
});