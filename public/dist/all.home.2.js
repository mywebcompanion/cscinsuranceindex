/**
 * Created by ARUN on 9/12/2015.
 */

var InsuranceIndex = angular.module('InsuranceIndex',['highcharts-ng','ngAnimate', 'ui.bootstrap','ui.router','ng-mfb','easypiechart']);
InsuranceIndex.config(['$logProvider','$stateProvider','$urlRouterProvider',function($logProvider, $stateProvider, $urlRouterProvider){
    $stateProvider.state('index', {
        url : '/',
        controller : 'IndexController',
        templateUrl : 'views/index.html'
    }).state('home', {
        controller : 'CMenuController',
        templateUrl : 'views/countrymenu.html'
    }).state('country', {
        controller : 'CountryController',
        templateUrl : 'views/country.html',
        params: {stateObj: null}
    }).state('social', {
        url : '/social',
        controller : 'SocialController',
        templateUrl : 'views/social.html'
    }).state('support', {
        url : '/support',
        controller : 'SupportController',
        templateUrl : 'views/support.html'
    }).state('marketing', {
        url : '/marketing',
        controller : 'MarketingController',
        templateUrl : 'views/marketing.html'
    }).state('analytics', {
        url : '/analytics',
        controller : 'AnalyticsController',
        templateUrl : 'views/analytics.html'
    }).state('mobility', {
        url : '/mobility',
        controller : 'MobilityController',
        templateUrl : 'views/mobility.html'
    }).state('liststats',{
        controller : 'StatsController',
        templateUrl : 'views/stats.html',
        params: {
            market : '',
            company : ''
        },
        resolve : {
            loadStats : function($http,$stateParams){
                //$stateParams.market = $stateParams.market.charAt(0).toUpperCase() + $stateParams.market.slice(1);
                var response = $http.post('/home/stats',{market : $stateParams.market, company : $stateParams.company});
                response.success(function(data){
                    console.log(JSON.stringify(data));
                });
                return response;
            }
        }
    });
}]);
/**
 * Created by ARUN on 12/1/2016.
 */


InsuranceIndex.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
        '<li ng-repeat="star in stars" ng-class="star">' +
        '\u2605' +
        '</li>' +
        '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});
/**
 * Created by ARUN on 24/2/2016.
 */
var InsuranceIndex = InsuranceIndex || {};

InsuranceIndex.directive('dynamicTooltip',function($sce,$http){
    return{
        restrict : 'AE',
        scope:{
            message : '@',
            callback : '&',
            toolMsg: '='
        },
        templateUrl : '../views/dyntooltip.html',
        link : function(scope, element, attr){
            $(element).find('button').bind('mouseover', function(e) {
                scope.toolMsg = $sce.trustAsHtml("<b>" + "jinganami" + "</b>");
                /*var promise = $http.get('/product');
                promise.success(function(resp){
                    scope.message = $sce.trustAsHtml("<b>" + resp.product + "</b>");
                });*/

            });
        }
    }
});
/**
 * Created by ARUN on 12/1/2016.
 */

    InsuranceIndex.filter("LoopFilter", function(){
        return function(input, test){
            var newArray = [];
            if(!input) return;
            for(var x = 0; x < input.length; x+=2){
                newArray.push(input[x]);
            }
            return newArray;
        }
    });
/**
 * Created by ARUN on 21/12/2015.
 */


InsuranceIndex.service("UIMaster",function(){
    this.MenuVisibility = false;
    this.insuranceHeading = true;
    this.showCountryChart = false;
    this.getValues = function(){
        return{
            MenuVisibility : this.MenuVisibility,
            insuranceHeading : this.insuranceHeading,
            showCountryChart : this.showCountryChart
        }
    };
    this.gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };
});

/**
 * Created by ARUN on 10/12/2015.
 */

    InsuranceIndex.factory('StaticResourceFactory',function($http){
        var getStaticResource = function(resourcePath){
            var promise = $http.get(resourcePath);
            return promise;
        };
        return{
            getStaticResource : getStaticResource
        };
    });
/**
 * Created by ARUN on 15/12/2015.
 */

InsuranceIndex.factory('ChartConfig', function() {

    var getDefaultConfig = function () {
        return {
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {

                min: 0,
                title: {
                    text: 'CSC Insurance Index'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black, 0 0 3px black'
                        }
                    }
                },
                series: {
                    animation: {
                        //duration: 1500
                    }
                }
            },

            chart: {
                type: 'column',
                backgroundColor: '#fff',
                className: 'cscindexchart',
                height: 530,
                borderColor: "#ffffff",
                events: {
                    load: function () {
                        this.options.yAxis[0].update({
                            stackLabels: {
                                enabled: true
                            }
                        });
                    }
                }
            },

            series: [
                {
                    name: "CSC Insurance Index",
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    },
                    color: '#EF2525'

                }
            ],

            title: {
                text: 'CSC Insurance Index'
            },

            loading: false,
            hideDuration: 1200,
            showDuration: 1200
        };
    };
    var getGaugeConfig = function() {

        return {

            chart: {
                type: 'solidgauge',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            },

            title: null,

            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)' || (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1, '#55BF3B'], // green
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title: {
                    y: -70
                },
                labels: {
                    y: 16
                },
                min: 0
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },
            series: [{

                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver"></span></div>'
                }
            }],
            credits: {
                enabled: false
            }
        }};

        var testGauge = function(){

            return   {
                options: {
                    chart: {
                        type: 'solidgauge',
                        backgroundColor: null,
                        margin : [0,0,0,0]
                    },
                    pane: {
                        center: ['50%', '85%'],
                        size: '140%',
                        startAngle: -90,
                        endAngle: 90,
                        background: {
                            backgroundColor:'#EEE',
                            innerRadius: '60%',
                            outerRadius: '100%',
                            shape: 'arc'
                        }
                    },
                    solidgauge: {
                        dataLabels: {
                            y: -30,
                            borderWidth: 0,
                            borderColor:'#f00',
                            useHTML: true
                        }
                    }
                },
                series: [{
                    data: [16],
                    dataLabels: {
                        borderColor : '#f00',
                        format: '<div style="text-align:center"><span style="font-size:15px;color:#fff;border:0px">{y}</span><br/>'
                    }
                }],
                title: {
                    y: 50,
                    text: " "
                },
                yAxis: {
                    currentMin: 0,
                    currentMax: 20,
                    title: {
                        y: 140
                    },
                    stops: [
                        [0.1, '#DF5353'], // red
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#55BF3B'] // green
                    ],
                    lineWidth: 0,
                    tickInterval: 20,
                    tickPixelInterval: 400,
                    tickWidth: 0,
                    labels: {
                        y: 15
                    }
                },
                loading: false
            };

        };


        return {
            getDefaultConfig: getDefaultConfig,
            getGaugeConfig : getGaugeConfig,
            testGauge : testGauge
        };

});
/**
 * Created by ARUN on 15/12/2015.
 */

InsuranceIndex.factory('CountryStatsFactory', function($http,StaticResourceFactory){

    var getCountryData = function(market){
        if(market.toLowerCase() === "default"){
            market = "singapore";
        }
        return promise = $http.post('home/countrystats',{"market":market});// StaticResourceFactory.getStaticResource("json/" + market.toLowerCase() + "stats.json");
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
/**
 * Created by ARUN on 17/1/2016.
 */

var StateService = InsuranceIndex.service('StatsService', function($stateParams){

        this.getStateParameter = function(market, company){
            alert(market + 'market lah');
        }

});
/**
 * Created by ARUN on 26/1/2016.
 */

InsuranceIndex.service('CompanyService',function($http){
    this.loadCompanyInfo = function(company, country){
        return $http.post('/home/getCompanyInfo',{countryname :country, companyname : company});
    };
});
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
            var companies =[];
            for (company in response) {
                if (response[company].countryname.toUpperCase() === $scope.selectedCountry.toUpperCase()) {
                    companies.push(response[company].companyname);
                }
            }
            $scope.insuranceCompanyList = companies;
        });
    }
});

/**
 * Created by ARUN on 9/12/2015.
 */

InsuranceIndex.controller('CountryController', function($scope,$window, ChartConfig, CountryStatsFactory, StaticResourceFactory,$stateParams,$rootScope) {

    $scope.chartConfig = ChartConfig.getDefaultConfig();
    $scope.selected = undefined;
    $scope.countryList = ['Malaysia','HongKong','Singapore','India','Japan','Indonesia'];


    var renderChart = function(country){
        var promise = CountryStatsFactory.getCountryData(country);

        promise.success( function(data){
            $scope.chartConfig.series = $scope.chartConfig.series.splice(0,1);
            $scope.chartConfig.series = $scope.chartConfig.series.concat(data);
            $scope.chartConfig.title.text =   "Insurance Index" + " - " + country;
            var chart = $('#main-chart').highcharts($scope.chartConfig);
        });
        promise.error (function(err){
            console.log("For now :-) . " + err);
        });
    };
    if($rootScope.showCountryChart) {
        renderChart($stateParams.stateObj.country);
    }

    $scope.$watch('selected', function(){
            for(var i=0; i<$scope.countryList.length; ++i){
                if($scope.countryList[i] === $scope.selected){
                    renderChart($scope.selected);
                    $(window).resize(function() {
                        height = chart.height;
                        width = $("#chartRow").width() / 2;
                        chart.setSize(width, height, doAnimation = true);
                    });
                }
            }
    });

    var promise = StaticResourceFactory.getStaticResource("json/main-table.json");
    promise.success(function(data){
        $scope.params = data[0];
    });
    promise.error(function(err){
        console.log("For now i dont care :-) . " + err);
    });

});





/**
 * Created by ARUN on 10/12/2015.
 */


InsuranceIndex.controller('MainController', function($scope,$rootScope,StaticResourceFactory,UIMaster){

    var promise = StaticResourceFactory.getStaticResource("json/menu.json");
    promise.success( function(data){
        $scope.menu = data;
    });

    promise.error (function(err){
            console.log("For now i dont care :-) . " + err);
    });

    $rootScope.menuVisibility = UIMaster.MenuVisibility;
    $rootScope.insuranceHeading = UIMaster.insuranceHeading;
    $rootScope.showCountryChart = UIMaster.showCountryChart;
    $scope.update = UIMaster.getValues();

    $scope.$watch("menuVisibility", function(newVal, oldVal) {
        UIMaster.menuVisibility = newVal;
    });
});

/**
 * Created by ARUN on 11/1/2016.
 */
InsuranceIndex.controller('StatsController', function($scope,UIMaster,ChartConfig, $rootScope,$state, $stateParams, loadStats, $location, $anchorScroll, CompanyService ) {

    $scope.validKey = function(val){
        var pattern = /^_.*$/;
        return !pattern.test(val);
    };
    $scope.toolMessage = {};
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
    $scope.categories = ['Analytics','CMS','Email & chat','Mobile & UX','SEO & ads','social'];
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

/**
 * Created by ARUN on 11/1/2016.
 */
InsuranceIndex.controller('MFBController', function($scope){

    $scope.position = 'tl';

    $scope.effect =  {
        value: 'slidein',
        name: 'Slide in + fade'
    };

    $scope.button = {
        label: 'a link',
        icon: 'ion-paper-airplane'
    };

});
