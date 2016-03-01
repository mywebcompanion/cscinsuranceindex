/**
 * Created by ARUN on 1/3/2016.
 */
/**
 * Created by ARUN on 29/2/2016.
 */

var AdminApp = angular.module('AdminApp',['ng-admin']);
var baseUrl = "/api/";
AdminApp.config(['NgAdminConfigurationProvider', function(nga){
    var admin = nga.application('CSC Di2 Admin Panel').baseApiUrl(baseUrl); //An application holds views, datagrids, forms, and templates for the entire administration.
    var metrics = getMetricsConfig(nga);
    var company = getCompanyConfig(nga);
    var metricdata = getMetricDataConfig(nga);
    admin.addEntity(metrics);
    admin.addEntity(company);
    admin.addEntity(metricdata);
    admin.menu(nga.menu()
            .addChild(nga.menu(metrics).icon('<span class="glyphicon glyphicon-tag"></span>'))
            .addChild(nga.menu(company).icon('<span class="glyphicon glyphicon-flag"></span>'))
            .addChild(nga.menu(metricdata).icon('<span class="glyphicon glyphicon-star"></span>'))
    );
    nga.configure(admin);
}]);

/*
 listView      => GET    /users
 creationView  => POST   /users
 showView      => GET    /users/:id
 editionView   => PUT    /users/:id
 deletionView  => DELETE /users/:id*/
