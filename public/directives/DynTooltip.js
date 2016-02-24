/**
 * Created by ARUN on 24/2/2016.
 */
var InsuranceIndex = InsuranceIndex || {};

InsuranceIndex.directive('dynamicTooltip',function($sce,$http){
    return{
        restrict : 'AE',
        scope:{
            metricname : '@',
            callback : '&',
            toolmsg: '=',
            market: '@',
            company: '@'
        },
        templateUrl : '../views/dyntooltip.html',
        link : function(scope, element, attr){
            $(element).find('button').bind('mouseover', function(e) {

                scope.toolmsg = $sce.trustAsHtml("<p>Loading Comparison data. Please wait .....</p>");
                var promise = $http.post('/home/compare',{market:scope.market,company:scope.company,metricname:scope.metricname});
                promise.success(function(resp){
                    var htmlString = "";
                    angular.forEach(resp, function(value,key){
                        htmlString += "<div class='row' style='z-index:200'><div class='col-xs-6'>";
                        htmlString += value.company;
                        htmlString += "</div>";
                        htmlString += "<div class='col-xs-6'>";
                        htmlString += value.value;
                        htmlString += "</div>";
                        htmlString += "</div>";
                    });
                    scope.toolmsg = $sce.trustAsHtml(htmlString);
                });

            });
        }
    }
});