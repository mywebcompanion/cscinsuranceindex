/**
 * Created by ARUN on 18/1/2016.
 */

AdminApp.service('CategoryService', function(){

    this.getCategories = function(){
        var categories = ['Analytics','CMS','Email & chat','Mobile & UX','SEO & ads','social'];
        return categories;
    };

});