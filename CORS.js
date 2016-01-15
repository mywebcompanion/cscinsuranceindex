/**
 * Created by ARUN on 11/1/2016.
 */
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://1bbad510.ngrok.io/");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

module.exports = allowCrossDomain;