/**
 * Created by ARUN on 21/12/2015.
 */

InsuranceIndex.controller('HomeController', function($scope,UIMaster,$rootScope,$state) {

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

    $scope.insuranceCompanyList = ['AIA'];

    $scope.selectedCountries = [];

    $scope.selectCountry = function(event,country) {
        alert("twice!");
        this.btn[country.toLowerCase()].state = !this.btn[country.toLowerCase()].state;
        var btnSelected = false;
        var index = $scope.selectedCountries.indexOf(country.toLowerCase());
        if (index === -1) {
            $scope.selectedCountries.push(country.toLowerCase());
            alert("newly selected countries" + $scope.selectedCountries);
            $rootScope.insuranceHeading = false;
            $rootScope.MenuVisibility = true;
            $rootScope.showCountryChart = true;
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
            alert("selected countries" + $scope.selectedCountries);
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
