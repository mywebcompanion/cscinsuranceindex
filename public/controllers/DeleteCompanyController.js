/**
 * Created by ARUN on 2/1/2016.
 */
/**
 * Created by ARUN on 31/12/2015.
 */

// Type of metric : Rating, value, Boolean

AdminApp.controller('DeleteCompanyController', function($scope, $state, AdminFactory,Flash, loadcompanies) {

    $scope.companylist = loadcompanies;
    $scope.gridOptions = {
        data: 'companylist',
        headerCellClass : 'grid-header',
        enableCellEditOnFocus: true,
        columnDefs: [
            {field: 'companyname', displayName: 'company'},
            {field:'countryname', displayName:'country'},
            {field:'weburl', displayName:'URL'},
            {field:'blogurl', displayName:'Blog'},
            {field:'newsletter', displayName:'Newsletter'},
            {field:'androidapps', displayName:'Play Store'},
            {field:'iosapps', displayName:'Apple Store'},
            {field:'twitterhandle', displayName:'Twitter'},
            {field:'facebookpage', displayName:'Facebook'},
            {field:'googlepage', displayName:'Google++'},
            {field:'instagrampage', displayName:'Instagram'},
            {field:'youtubechannel', displayName:'youtube'},
            {
                name: 'edit',
                field: '_id',
                cellClass: 'fa-mod-icon',
                cellTemplate: '<i class="fa fa-pencil-square-o fa-mod-icon" ng-model="row.entity.id" ng-click="grid.appScope.deleteModuleScreen(row.entity.id)"></i>'
            },
            {
                name: 'delete',
                field: '_id',
                cellClass: 'fa-mod-icon',
                cellTemplate: '<i class="fa fa-times fa-mod-icon" ng-model="row.entity.id" ng-click="grid.appScope.deleteModuleScreen(row.entity.id)"></i>'
            }

        ],
        enableColumnResizing : true,
        multiSelect: false
    };
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

