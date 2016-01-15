/**
 * Created by ARUN on 31/12/2015.
 */
/**
 * Created by ARUN on 23/12/2015.
 */
// Type of metric : Rating, value, Boolean

AdminApp.controller('AddMetricsController', function($scope,AdminFactory,Flash,$state) {

    $scope.metricTypes = ['Rating','Value','Boolean'];
    $scope.categories = ['Analytics','CMS','Email & chat','Mobile & UX','SEO & ads','social'];
    $scope.metric = {

    };

    $scope.submit = function(){
            $scope.metric.weightage ? $scope.metric.weightage *=10 : 100;
            var promise = AdminFactory.saveMetric($scope.metric);
            promise.success(function(resp){
                var message = '<strong> Great!</strong>  Your metrics has been successfully saved.';
                Flash.create('success', message, 'custom-class');
                $state.go('admin.addmetrics',{}, { reload: true });
                $scope.metric = {};
            });
            promise.error(function(){
                var message = '<strong> Sorry!</strong>  Your metrics failed to save.';
                Flash.create('danger', message, 'custom-class');
                $state.go($state.current, {}, {reload: true});
                $scope.metric = {};
            });
    }
});

