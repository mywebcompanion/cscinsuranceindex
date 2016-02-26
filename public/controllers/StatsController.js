/**
 * Created by ARUN on 11/1/2016.
 */
InsuranceIndex.controller('StatsController', function($scope,UIMaster,ChartConfig, $rootScope,$state, $stateParams, loadStats, $location, $anchorScroll, CompanyService ) {

    $scope.validKey = function(val){
        var pattern = /^_.*$/;
        return !pattern.test(val);
    };
    $scope.toolMessage = {};
    $scope.toolMessage.message = "Loading..";
    $scope.message = {};
    $scope.isValidUrl = function(value){
        var pattern1 = new RegExp("www");
        var pattern2= new RegExp("http");
        var pattern3 = new RegExp("https");
        var pattern4 = new RegExp(".com");
        var testVal = value.toLowerCase();
        if(pattern1.test(testVal) || pattern2.test(testVal) || pattern3.test(testVal) || pattern4.test(testVal)){
            if(!pattern2.test(testVal)){
                value = "http://" + value;
            }
            return true;
        }
        return false;
    };

    $scope.stats = {};
    UIMaster.menuVisibility = true;
    UIMaster.insuranceHeading = true;
    $scope.categories = ['social','Analytics','Mobile & UX','Email & chat','CMS','SEO & ads'];
    $scope.percent = 70;
    $scope.categJSON = loadStats.data;
    $scope.stats.market = $stateParams.market;
    $scope.stats.company = $stateParams.company;
    $scope.stats.overallScore = loadStats.data[$scope.stats.market][$scope.stats.company]["score"];
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
    $scope.getRandomColor = function(){
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
