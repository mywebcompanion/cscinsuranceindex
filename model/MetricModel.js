/**
 * Created by ARUN on 1/1/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MetricSchema = new Schema({
    name : String,
    type : String,
    category : String
});

var MetricModel = mongoose.model('metric',MetricSchema);

module.exports = MetricModel;