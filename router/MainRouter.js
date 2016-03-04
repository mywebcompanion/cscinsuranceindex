/**
 * Created by ARUN on 23/12/2015.
 */

var express = require('express');
var MainRouter = express.Router();
var path = require('path');
var config = require('config');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var AdminRouter = require('./AdminRouter');
var MainService = require('../services/MainService')();
var User = require('../model/UserModel');

MainRouter.get('/', function(req,res,next){
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});
MainRouter.get('/oldadmin', function(req,res,next){
    res.sendFile(path.resolve(__dirname + '/../public/admin-old.html'));
});

MainRouter.get('/home', function(req,res,next){
   res.sendFile(path.resolve(__dirname + '/../public/home.html')); //Using ../ is considered as some kinda hack . Use path resolve
});

MainRouter.post('/home/stats', function(req,res,next){
    MainService.getStats(req,res);
});

MainRouter.post('/home/countrystats', function(req,res,next){
    MainService.getAllStats(req,res);
});

MainRouter.use('/admin', AdminRouter);

MainRouter.get('/home/getAllCompanies',function(req,res,next){
    MainService.getAllCompanies(req,res);
});
MainRouter.post('/home/getCompanyInfo',function(req,res,next){
    MainService.getCompanyInfo(req,res);
});

MainRouter.post('/home/compare',function(req,res,next){
    console.log("Inside compare service");
    MainService.getComparisonReport(req,res);
})

//FACEBOOK PASSPORT AUTHENTICATION



passport.use(new FacebookStrategy({
        clientID: config.Application.facebookauth.appid,
        clientSecret: config.Application.facebookauth.secret,
        callbackURL: config.Application.facebookauth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            User.findOne({'facebook.id': profile.id}, function(err, user){
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, user);
                }
                else{
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.save(function(err){
                        if(err){
                            throw err;
                        }
                        return done(null, newUser);
                    })

                }
            });
        });
    }
));


MainRouter.get('/auth/facebook', passport.authenticate('facebook'));


MainRouter.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/login' }));


module.exports = MainRouter;


/*
 Analytics,
 User Experience
 Social Media
 SEO & Marketing - Ads are part of marketing
 Mobility
 Suppor
 */