var express = require('express');
var router = express.Router();
var db = require("../database/connection");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/bookingStatus', function(req, res, next) {

//   var sql='SELECT * FROM bookings';
//     db.query(sql, function (err, data, fields) {
//     if (err) throw err;
//     res.render('bookingStatus', { title: 'User List', userData: data});
//   });
 
// });


module.exports = router;