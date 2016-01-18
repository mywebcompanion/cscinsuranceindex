/**
 * Created by ARUN on 12/1/2016.
 */

    InsuranceIndex.filter("LoopFilter", function(){
        return function(input, test){
            var newArray = [];
            if(!input) return;
            for(var x = 0; x < input.length; x+=2){
                newArray.push(input[x]);
            }
            return newArray;
        }
    });