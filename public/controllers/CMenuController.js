/**
 * Created by ARUN on 21/12/2015.
 */

InsuranceIndex.controller('CMenuController', function($scope,UIMaster,$rootScope,$state) {

    // http://jsfiddle.net/nw5ndzrt/
    $scope.btn = {

        malaysia : {
            state : false
        },
        singapore : {
            state : false
        },
        hongkong : {
            state : false
        },
        japan : {
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
                    $state.go('liststats');
                }
        });
    };




    $scope.selectedCountries = [];

    $scope.selectCountry = function(event,country) {
        $('.insurance-search').focus();
        this.btn[country.toLowerCase()].state = !this.btn[country.toLowerCase()].state;
        var btnSelected = false;
        var index = $scope.selectedCountries.indexOf(country.toLowerCase());
        if (index === -1) {
            $scope.selectedCountries.push(country.toLowerCase());
            $rootScope.insuranceHeading = false;
            $rootScope.MenuVisibility = true;
            $rootScope.showCountryChart = true;
            $scope.selection_made="";
            $state.go('country', {
                stateObj: {
                    country: $scope.selectedCountries
                }
            },{
                reload: true
            });
        }
        else {
            $scope.selectedCountries.splice(index, 1);
            if ($scope.selectedCountries.length > 0) {
                $state.go('country', {
                    stateObj: {
                        country: $scope.selectedCountries
                    }

                }, {
                    reload: true
                });
            }
            else {
                $scope.selectedCountries = [];
                $rootScope.insuranceHeading = true;
                $rootScope.MenuVisibility = false;
                $rootScope.showCountryChart = false;
                $state.go('home');
            }
        }
    };

});
