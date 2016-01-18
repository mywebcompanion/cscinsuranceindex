/**
 * Created by ARUN on 1/1/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MetricsDataSchema = new Schema({
    companyName : String,
    market : String,
    recommendations : Object,
    metrics : [Schema.Types.Mixed]

});

var MetricsDataModel = mongoose.model('metricdata',MetricsDataSchema);

module.exports = MetricsDataModel;