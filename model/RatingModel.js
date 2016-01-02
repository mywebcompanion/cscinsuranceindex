/**
 * Created by ARUN on 2/1/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MetricsDataSchema = new Schema({
    companyinfoid : {
        type: String,
        required  : true
    }
});

var MetricsDataModel = mongoose.model('metricdata',MetricsDataSchema);

module.exports = MetricsDataModel;