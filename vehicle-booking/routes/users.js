var express = require('express');
var router = express.Router();
var db = require("../database/connection");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// router.get('/bookingStatus', function(req, res, next) {
//   db.query('SELECT * FROM bookings',function(err,data,fields){
//     if(err)
//       console.log("Error : %s ",err);
//     res.render('/bookingStatus',{title:"list",userdata:data}); 
//   }); 
// });


module.exports = router;