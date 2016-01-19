/**
 * Created by ARUN on 21/12/2015.
 */

InsuranceIndex.controller('CMenuController', function($scope,UIMaster,$rootScope,$state, $location, $anchorScroll) {

    // http://jsfiddle.net/nw5ndzrt/
    $scope.selectedCountry = "";
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
    $scope.insuranceCompany ="";
    $scope.insuranceCompanyList = ['AIA','NTUS','AXA','Aviva','Great Eastern','Tokio Marine','Swiss Life','Allianz'];
    $scope.renderCategory = function(insCompany){
        $scope.activecompany = "";
        angular.forEach($scope.insuranceCompanyList, function(company){
            insCompany ? insCompany.trim() : "";
                if(insCompany === company){
                    $scope.activecompany = company;
                    $rootScope.insuranceHeading = false;
                    $rootScope.MenuVisibility = true;
                    $rootScope.showCountryChart = false;
                    $state.transitionTo('liststats', {
                        market: $scope.selectedCountry,
                        company:insCompany
                    },{
                        reload: true
                    });
                }
        });
    };


    $scope.selectedCountries = [];

    $scope.selectCountry = function(event,country) {
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


    }
});
