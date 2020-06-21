var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth/login');
});

router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});


router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.get('/index', function(req, res, next) {
  res.render('home/index');   
});


router.get('/admin', function(req, res, next) {
  res.render('auth/adminRoom');
});


router.get('/auth/change-password', function(req, res, next) {
  res.render('auth/changePass');
});

router.get('/driver', function(req, res, next) {
  res.render('services/driver');
});

router.get('/user/add-vehicle', function(req, res, next) {
  res.render('services/addVehicle');
  
});

router.get('/user/booking', function(req, res, next) {
  res.render('services/booking');
});

router.get('/bookingStatus', function(req, res, next) {
  res.render('services/bookingStatus');
});

router.get('/bookingHistory', function(req, res, next) {
  res.render('services/bookingHistory');  //not working
});

router.get('/services/driverDetails', function(req, res, next) {
  res.render('services/driverDetails');   //not working
});

router.get('/vehicleDetails', function(req, res, next) {
  res.render('services/vehicleDetails');    //not working
});

module.exports = router;


