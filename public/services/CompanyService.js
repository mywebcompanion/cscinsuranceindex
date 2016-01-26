/**
 * Created by ARUN on 26/1/2016.
 */

InsuranceIndex.service('CompanyService',function($http){
    this.loadCompanyInfo = function(company, country){
        return $http.post('/home/getCompanyInfo',{countryname :country, companyname : company});
    };
});