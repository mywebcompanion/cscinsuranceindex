/**
 * Created by ARUN on 31/12/2015.
 */

// Type of metric : Rating, value, Boolean

AdminApp.controller('DeleteMetricsController', function($scope, $state, AdminFactory,Flash, loadMetrics) {

    $scope.metriclist = loadMetrics;
    $scope.deleteMetric = function(metricName){
        var selectedMetric = _.filter($scope.metriclist, function(metric){
            return metric.name === metricName;
        });
        var promise = AdminFactory.deleteMetric(selectedMetric);
        promise.success(function(resp){
            var message = '<strong> Great!</strong>  Your metrics has been successfully deleted.';
            Flash.create('success', message, 'custom-class');
            $state.go('admin.deletemetrics',{}, { reload: true });
            $scope.metric = {};
        });
        promise.error(function(){
            var message = '<strong> Sorry!</strong>  Your metrics was not deleted.';
            Flash.create('danger', message, 'custom-class');
            $state.go('admin.deletemetrics',{}, { reload: true });
            $scope.metric = {};
        });
    }
});

