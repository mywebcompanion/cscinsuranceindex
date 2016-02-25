/**
 * Created by ARUN on 21/12/2015.
 */


InsuranceIndex.controller('CMenuController', function($scope,UIMaster,$rootScope,$state,$location,CountryStatsFactory) {


    // http://jsfiddle.net/nw5ndzrt/
    $scope.selectedCountry = "";
    $scope.home = {};
    $scope.btn = {

        malaysia : {
            state : false
        },
        singapore : {
            state : false
        },
        hongkong : {
            state : false
        }
    };


    $scope.renderCategory = function(insCompany){
        $scope.home.activecompany = "";
        angular.forEach($scope.insuranceCompanyList, function(company){
            insCompany ? insCompany.trim() : "";
            console.log("InsCompany " + insCompany + "company" + company);
                if(insCompany === company){
                    $scope.home.activecompany = company;
                    $rootScope.insuranceHeading = false;
                    $rootScope.MenuVisibility = true;
                    $rootScope.showCountryChart = false;
                    console.log("Shoud transition to liststats");
                    $state.transitionTo('liststats', {
                        market: $scope.selectedCountry,
                        company:insCompany
                    },{
                        reload: true
                    });
                }
        });
    };

    function uniq(a) {
        var seen = {};
        return a.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }

    $scope.selectedCountries = [];

    $scope.selectCountry = function(event,country) {
        $scope.home.activecompany = "";
        $scope.home.insuranceCompany = "";
        if(country != $scope.selectedCountry){
            if($scope.selectedCountry != "")
                this.btn[$scope.selectedCountry].state = false;
            $rootScope.insuranceHeading = false;
            $rootScope.showCountryChart = true;
            this.btn[country].state = !this.btn[country].state;
            $scope.selectedCountry = country;
            $('.insurance-search').focus();
            $state.go('country', {
                stateObj: {
                    country: $scope.selectedCountry
                }
            },{
                reload: true
            });
        }
        else{
            $rootScope.insuranceHeading = true;
            $scope.selectedCountry = "";
            this.btn[country].state = !this.btn[country].state;
            $rootScope.showCountryChart = false;
        }
        $scope.insuranceCompanyList = "";
        var promise = CountryStatsFactory.getAllCompanies();
        promise.success(function(response){
            console.log($scope.insuranceCompanyList);
            var companies =[];
            for (company in response) {
                console.log(response[company].countryname.toUpperCase(), $scope.selectedCountry.toUpperCase(), (response[company].countryname.toUpperCase() === $scope.selectedCountry.toUpperCase()));
                if (response[company].countryname.toUpperCase() === $scope.selectedCountry.toUpperCase()) {
                    companies.push(response[company].companyname);
                }
            }
            $scope.insuranceCompanyList = uniq(companies);
        });
    }
});
