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