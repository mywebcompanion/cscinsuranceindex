/**
 * Created by ARUN on 28/12/2015.
 */

var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
    companyname:String,
    countryname:String,
    weburl:String,
    blogurl:String,
    newsletter:String,
    androidapps:String,
    fb:String,
    iosapps:String,
    twitterhandle:String,
    facebookpage:String,
    googlepage:String,
    instagrampage:String,
    youtubechannel:String,
    logo:String
});

var CompanyModel = mongoose.model('companyinfo', CompanySchema);

module.exports = CompanyModel;