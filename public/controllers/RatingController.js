/**
 * Created by ARUN on 31/12/2015.
 */
/**
 * Created by ARUN on 27/12/2015.
 */
// Type of metric : Rating, value, Boolean

AdminApp.controller('RatingController',function(Flash, $scope,$http,$state, $filter, loadMarketPromise, AdminFactory, CategoryService) {

    var formRecommendations = function(recommendations){
        angular.forEach($scope.categories, function(categ){
            if(recommendations[categ]) {
                var categArray = recommendations[categ].split(",");
                recommendations[categ] = categArray;
            }
        });
    };
    $scope.metric = {};
    $scope.metric.recommendations = {};
    $scope.metricsData =  loadMarketPromise;
    $scope.loader = {
        loading: false
    };
    $scope.categories = CategoryService.getCategories();
    // Slider options with event handlers
    $scope.slider = {
        'options': {
            start: function (event, ui) { $log.info('Event: Slider start - set with slider options', event); },
            stop: function (event, ui) { $log.info('Event: Slider stop - set with slider options', event); }
        }
    };

    $scope.submit = function(){
        formRecommendations($scope.metric.recommendations);
        angular.forEach($scope.metricsData, function(data){
            if((data.companyName === $scope.metric.company) && (data.market === $scope.metric.market)){
                delete data.$$hashKey;

                angular.forEach(data.metrics, function(mdata){
                    delete mdata.$$hashKey;
                    if($scope.metric.metric[mdata.name]){
                        mdata.value = $scope.metric.metric[mdata.name];
                    }
                });
            }
        });
        var filteredData = $filter('filter')($scope.metricsData, {companyName:$scope.metric.company, market:$scope.metric.market });
        filteredData[0].recommendations = $scope.metric.recommendations;
        var promise = AdminFactory.saveMetricsRating(filteredData);
        //$scope.loader.loading = true ;
        promise.success(function(data){
            $scope.loader.loading = false;
            var message = '<strong> Great!</strong>  Your rating has been successfully saved.';
            Flash.create('success', message, 'custom-class');
            $state.go('admin.rating',{}, { reload: true });

        });
        promise.error(function(err){
            $scope.loader.loading = false;
            var message = '<strong> Sorry!</strong>  Your rating failed to save. Please try again';
            Flash.create('danger', message, 'custom-class');
            $state.go('admin.rating',{}, { reload: true });

        });
    };
});