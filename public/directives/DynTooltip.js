/**
 * Created by ARUN on 24/2/2016.
 */
var InsuranceIndex = InsuranceIndex || {};

InsuranceIndex.directive('dynamicTooltip',function($sce,$http){
    return{
        restrict : 'AE',
        scope:{
            message : '@',
            callback : '&'
        },
        templateUrl : '../views/dyntooltip.html',
        link : function(scope, element, attr){
            $(element).find('button').bind('mouseover', function(e) {
                alert("yes");
                scope.message.name = $sce.trustAsHtml("<b>" + "jinganami" + "</b>");
                /*var promise = $http.get('/product');
                promise.success(function(resp){
                    scope.message = $sce.trustAsHtml("<b>" + resp.product + "</b>");
                });*/

            });
        }
    }
});