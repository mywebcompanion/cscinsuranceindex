/**
 * Created by ARUN on 10/12/2015.
 */

    InsuranceIndex.factory('StaticResourceFactory',function($http){
        var getStaticResource = function(resourcePath){
            var promise = $http.get(resourcePath);
            return promise;
        };
        return{
            getStaticResource : getStaticResource
        };
    });