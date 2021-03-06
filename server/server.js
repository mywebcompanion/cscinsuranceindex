var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var config = require('config');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MainRouter = require("../router/MainRouter");

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

mongoose.connect("mongodb://csc:CscDi2@ds017158-a0.mlab.com:17158,ds017158-a1.mlab.com:17158/cscdi2?replicaSet=rs-ds017158");
//mongoose.connect("mongodb://csc:csc@ds047325.mongolab.com:47325/cscinsuranceindex");
app.use(loopback.static(path.resolve(__dirname + './../public/')));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/',MainRouter);

app.on('uncaughtException', function (err) {
    console.log("UncaughtException " + err);
});


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
