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
    $rootScope.insuranceHeading = UIMaster.insuranceHeading
    $scope.update = UIMaster.getValues();

    $scope.$watch("menuVisibility", function(newVal, oldVal) {
        UIMaster.menuVisibility = newVal;
    });
});
