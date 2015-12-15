/**
 * Created by ARUN on 10/12/2015.
 */


InsuranceIndex.controller('MainController', function($scope,StaticResourceFactory){
    var promise = StaticResourceFactory.getStaticResource("json/menu.json");
    promise.success( function(data){
        $scope.menu = data;
    });
    promise.error (function(err){
            console.log("For now i dont care :-) . " + err);
    });
    console.log("Setting to scope menu" + $scope.menu);
});