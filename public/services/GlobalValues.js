/**
 * Created by ARUN on 21/12/2015.
 */


InsuranceIndex.service("UIMaster",function(){
    this.MenuVisibility = false;
    this.insuranceHeading = true;
    this.getValues = function(){
        return{
            MenuVisibility : this.MenuVisibility,
            insuranceHeading : this.insuranceHeading
        }
    };
});
