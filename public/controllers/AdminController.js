/**
 * Created by ARUN on 23/12/2015.
 */

AdminApp.controller('AdminController', function($scope,$rootScope,$state,AdminFactory, Flash) {

    var promise = AdminFactory.getCountryConfig();

    promise.success(function(response){
            //http://jsfiddle.net/mrajcok/cFSJ3/ - Dynamic Forms
            $scope.companyInfo = response;

    });
    promise.error(function(err){
            console.log("Error retreiving country configuration " + err);
    });


    $scope.submit = function () {
        var promise = AdminFactory.saveCompanyDetails($scope.companyInfo);
        promise.success(function(resp){
            console.log("Company Info saved successfully");
            var message = '<strong> Great!</strong>  Company details saved successfully.';
            Flash.create('success', message, 'custom-class');
            $state.go('admin.company',{}, { reload: true });
        });
    }


});
