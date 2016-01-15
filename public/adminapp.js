/**
 * Created by ARUN on 23/12/2015.
 */

var AdminApp = angular.module('AdminApp',['ngAnimate', 'ui.bootstrap','ui.router','ui.slider','flash']);

AdminApp.config(function($logProvider,$stateProvider,$urlRouterProvider){
    //$urlRouterProvider.otherwise('/home');
    $stateProvider.state('admin',{
        url : '/',
        controller : 'AdminController',
        templateUrl : 'views/adminhome.html'
    });

    $stateProvider.state('admin.addcompany',{
        url : 'addcompany',
        controller : 'AdminController',
        templateUrl : 'views/companyadmin.html'
    });
    $stateProvider.state('admin.deletecompany',{
        url : 'deletecompany',
        controller : 'DeleteCompanyController',
        templateUrl : 'views/deletecompany.html',
        resolve:   {
            loadcompanies : function($http){
                return $http.get('/admin/companyinfo').then(function(res){
                    return res.data;
                });
            }
        }
    });
    $stateProvider.state('admin.editcompany',{
        url : 'editcompany',
        controller : 'EditCompanyController',
        templateUrl : 'views/editcompany.html',
        resolve:   {
            editcompanies : function($http){
                return $http.get('/admin/companyinfo').then(function(res){
                    return res.data;
                });
            }
        }
    });

    $stateProvider.state('admin.addmetrics',{
        url : 'addmetrics',
        controller : 'AddMetricsController',
        templateUrl : 'views/addmetrics.html'
    });
    $stateProvider.state('admin.deletemetrics',{
        url : 'deletemetrics',
        controller : 'DeleteMetricsController',
        templateUrl : 'views/deletemetrics.html',
        resolve:   {
            loadMetrics : function($http){
                return $http.get('/admin/getAllMetrics').then(function(res){
                    return res.data;
                });
            }
        }
    });
    $stateProvider.state('admin.addbenchmark',{
        url : 'addbenchmark',
        controller : 'AddBenchMarkController',
        templateUrl : 'views/addbenchmark.html',
        resolve:   {
            loadMetrics : function($http){
                return $http.get('/admin/getValueMetrics').then(function(res){
                    return res.data;
                });
            }
        }
    });
    $stateProvider.state('admin.rating',{
        url : 'rating',
        controller : 'RatingController',
        templateUrl : 'views/ratecompany.html',
        resolve:   {
            loadMarketPromise : function($http){
                return $http.get('/admin/metricsdata').then(function(res){
                    return res.data;
                });
            }
        }
    });
});

AdminApp.filter('unique', function() {
    return function(collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
});

AdminApp.run(function($rootScope, $state){

    $state.transitionTo('admin'); // Kickstarting default route

});

angular.element(document).ready(function() {
    angular.bootstrap(AdminApp, ['AdminApp']);
});