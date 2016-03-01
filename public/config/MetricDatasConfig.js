/**
 * Created by ARUN on 1/3/2016.
 */
/**
 * Created by ARUN on 1/3/2016.
 */
/**
 * Created by ARUN on 1/3/2016.
 */

var getMetricDataConfig = function (nga) {
    var metricdata = nga.entity('metricdatas');
    metricdata.listView().fields([ //You define fields on views, not on entities, in order to be able to use a different set of fields for each view
        nga.field('id'),
        nga.field('companyName'),
        nga.field('market'),
        nga.field('metrics','embedded_list')
            .targetFields([
                nga.field('name'),
                nga.field('type'),
                nga.field('value'),
                nga.field('weightage'),
                nga.field('rateorder')
            ])

    ]);

    console.log("metricdata" + metricdata.entry);
    // use the same fields for the editionView as for the creationView
    var targetFields = [];
    var addCustomField = function(value, entry){
        console.log("Called addCustomField");
            var ret = nga.field('value');
            field.map(function(value,entry){
                console.log("Mapping");
                if(entry.type === "Boolean"){
                    ret = nga.field('value','choice')
                        .choices([
                            {"label":"yes",value:"yes"},
                            {"label":"no",value:"no"}
                        ]);
                }
            });
        console.log("==============");
        return ret;
    };
    metricdata.editionView().fields([
        nga.field('metrics','embedded_list')
            .targetFields([
                nga.field('name').editable(false).map(function(value, entry){
                    addCustomField(value.entry);
                })


            ])
    ]);

    metricdata.creationView().fields(metricdata.listView().fields());


    return metricdata;
};