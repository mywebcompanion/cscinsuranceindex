/**
 * Created by ARUN on 11/1/2016.
 */
InsuranceIndex.controller('StatsController', function($scope,UIMaster,ChartConfig, $rootScope,$state, $stateParams, loadStats, $location, $anchorScroll, CompanyService ) {

    var calcOverAllScore = function(data){
        if(!data){
            return 0;
        }
        data[$scope.stats.market] ? data[$scope.stats.market] : data[$scope.stats.market.toLowerCase()];
        var overallScore = 0;
        console.log(data[$scope.stats.market][$scope.stats.company]);
        angular.forEach(data[$scope.stats.market][$scope.stats.company],function(value, key){
            if(value)
                overallScore +=  value.score;
        });
        return overallScore;
    };

    $scope.validKey = function(val){
        var pattern = /^_.*$/;
        return !pattern.test(val);
    };

    $scope.isValidUrl = function(value){
        var pattern1 = new RegExp("www");
        var pattern2= new RegExp("http");
        var pattern3 = new RegExp("https");
        var testVal = value.toLowerCase();
        if(pattern1.test(testVal) || pattern2.test(testVal) || pattern3.test(testVal) ){
            return true;
        }
        return false;

    }

    $scope.stats = {};
    UIMaster.menuVisibility = true;
    UIMaster.insuranceHeading = true;
    $scope.percent = 70;
    $scope.categJSON = loadStats.data;
    $scope.stats.market = $stateParams.market;
    $scope.stats.company = $stateParams.company;
    $scope.stats.overallScore = calcOverAllScore(loadStats.data);
    CompanyService.loadCompanyInfo($stateParams.company, $stateParams.market).success(function(data){
        $scope.stats.companyInfo = data;
    });
    $location.hash('stats-area');

    $anchorScroll();

    var myCircle = Circles.create({
        id:                  'circles-1',
        radius:              60,
        value:               43,
        maxValue:            100,
        width:               10,
        text:                function(value){return value + '%';},
        colors:              ['#D3B6C6', '#4B253A'],
        duration:            400,
        wrpClass:            'circles-wrp',
        textClass:           'circles-text',
        valueStrokeClass:    'circles-valueStroke',
        maxValueStrokeClass: 'circles-maxValueStroke',
        styleWrapper:        true,
        styleText:           true
    });

    $scope.easypieoptions = {
        animate:{
            duration:2000,
            enabled:true
        },
        barColor:'#fff600',
        scaleColor:false,
        border: 0,
        lineWidth:3,
        lineCap:'circle'
    };

});
