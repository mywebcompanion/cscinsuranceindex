/**
 * Created by ARUN on 11/1/2016.
 */
AdminApp.controller('AddBenchMarkController', function($scope,AdminFactory,Flash,$state, loadMetrics) {
    $scope.metriclist = loadMetrics;
    $scope.countryList = ["Singapore","Malaysia","Hongkong"];
    $scope.benchModel = {};

    $scope.submit = function(){
        $scope.benchModel.market =  $scope.benchModel.market.toLowerCase();
        var promise = AdminFactory.saveBenchMark($scope.benchModel);
        promise.success(function(resp){
            var message = '<strong> Great!</strong>  Your benchmark values have been successfully saved.';
            Flash.create('success', message, 'custom-class');
            $state.go('admin.addbenchmark',{}, { reload: true });
            $scope.benchlist = {};
        });
        promise.error(function(){
            var message = '<strong> Sorry!</strong>  Your benchmark values failed to save.';
            Flash.create('danger', message, 'custom-class');
            $state.go($state.current, {}, {reload: true});
            $scope.benchlist = {};
        });
    };
});
