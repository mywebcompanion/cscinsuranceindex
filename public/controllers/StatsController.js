/**
 * Created by ARUN on 11/1/2016.
 */
InsuranceIndex.controller('StatsController', function($scope,UIMaster,ChartConfig, $rootScope,$state, $stateParams, loadStats ) {
    UIMaster.menuVisibility = true;
    UIMaster.insuranceHeading = true;
    $scope.percent = 70;
    $scope.categJSON = loadStats.data;
    alert(JSON.stringify($scope.categJSON));
        $scope.prepareConfig = function(metric1, metric2){
            var config1 = new ChartConfig.getGaugeConfig();
            var config2 = new ChartConfig.getGaugeConfig();
            config1.series[0] = {
                name : metric1.name,
                data : [metric1.value]
            };
            config2.series[0] = {
                name : metric2.name,
                data : [metric2.value]
            };

            config1.yAxis = {
                max : metric1.benchmarkvalue,
                title : {
                    text: metric1.name
                }
            };
            config2.yAxis = {
                max : metric2.benchmarkvalue,
                title : {
                    text: metric2.name
                }
            };
            $scope.config1 = new ChartConfig.testGauge();
            $scope.config2 = new ChartConfig.testGauge();
          /*  $scope.config1 = config1;
            $scope.config2 = config2;*/
        };

    $scope.easypieoptions = {
        animate:{
            duration:2000,
            enabled:false
        },
        barColor:'#2C3E50',
        scaleColor:false,
        lineWidth:3,
        lineCap:'circle'
    };

});
