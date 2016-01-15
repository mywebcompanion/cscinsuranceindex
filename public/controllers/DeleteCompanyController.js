/**
 * Created by ARUN on 2/1/2016.
 */
/**
 * Created by ARUN on 31/12/2015.
 */

// Type of metric : Rating, value, Boolean

AdminApp.controller('DeleteCompanyController', function($scope, $state, AdminFactory,Flash, loadcompanies) {

    $scope.companylist = loadcompanies;
    $scope.deletecompany = function(companyname, market){
        var selectedCountry = _.filter($scope.companylist, function(company) {
            return (company.companyname === companyname && company.countryname === market);
        });
        var promise = AdminFactory.deleteCompany(selectedCountry);
        promise.success(function(resp){
            var message = '<strong> Great!</strong>  company information has been successfully deleted.';
            Flash.create('success', message, 'custom-class');
            $state.go('admin.deletecompany',{}, { reload: true });
        });
        promise.error(function(){
            var message = '<strong> Sorry!</strong>  company information was not deleted. Please try again';
            Flash.create('danger', message, 'custom-class');
            $state.go('admin.deletecompany',{}, { reload: true });
        });
    }
});

