var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
//var localStorage = require('local-storage');

var db = require("../database/connection");
var userModel = require("../database/userModel");
var validationRules = require('../validation_rules/rules');
var asyncValidator = require('async-validator-2');

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth/login');
});


router.get('/auth/not-found', function(req, res, next) {
  res.render('auth/not-found');
});

router.post('/auth', function(req, res, next) {
  var login = req.body.login;
  var username = req.body.uname;
	var password = req.body.pass;
	if (username && password) {
		db.query('SELECT * FROM signup WHERE registered_as = ? AND uname = ? AND upass = ?', [login,username, password], function(error, results, fields) {
			if (results.length > 0) {
        console.log('successful');
				//req.session.loggedin = true;
        //req.session.uname = username;
        // if(req.body.login == "/admin")
        //   res.render('/admin');
        //else// if(req.body.login == '/home/index')
          //res.redirect('/home/index');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});


  router.post("/signup", function (req, res, next) {
  //console.log("inside the signup post");
  // getting the values
  const payload = {
    login: req.body.login,
    uname: req.body.uname,
    pass: req.body.pass,
    fname: req.body.fname,
    age: req.body.age,
    dob: req.body.dob,
    gender: req.body.male || req.body.female,
    no: req.body.no,
    city: req.body.city,
    states: req.body.states,
    mail: req.body.mail,
    Address: req.body.Address,
  };

  // console.log("payload", payload);

   var sql =
    "INSERT INTO signup (registered_as,uname,upass,fname,age,dob,gender,phoneno,city,state,email,address) VALUES ?";
  var values = [
    [
      payload.login,
      payload.uname,
      payload.pass,
      payload.fname,
      parseInt(payload.age),
      payload.dob,
      payload.gender || payload.gender,
      payload.no,
      payload.city,
      payload.states,
      payload.mail,
      payload.Address,
    ],
  ];
  db.query(sql, [values], function (err, res) {
    if (err) throw err;
    else
      res.send("sucessfully added");
      res.end();
  });
});

router.get("/login", function (req, res, next) {
  res.render("auth/login");
});


router.get('/home/index', function(req, res, next) {
  res.render('home/index');   
});


router.get('/admin', function(req, res, next) {
  res.render('auth/adminRoom');
});


router.get('/auth/change-password', function(req, res, next) {
  res.render('auth/changePass');
});

router.post("/auth/change-password", function (req, res, next) {
  var data = {
    user: req.body.uname,
    oldPassword: req.body.cpass,
    newPassword: req.body.npass,
    confirmPassword: req.body.renpass,
  };
 
    if(req.body.npass == req.body.renpass){
      db.query('UPDATE signup SET upass = ? WHERE uname = ?', [data.newPassword, data.user], function(error, results, fields) {
        if (results.length > 0) {
          res.send('successfully updated');
        } else {
          res.send('Incorrect Username and/or Password!');
        }			
        res.end();
      });
  
    }else{
      console.log('not match');
      res.send("Your new passwords don't match");
      res.end();
    }
});


router.get('/driver', function(req, res, next) {
  res.render('services/driver');
});





router.post('/driver', function(req, res, next) {
  const info2 = {
    fname: req.body.fname,
    lname: req.body.lname,
    city: req.body.city,
    state: req.body.state,
    Address: req.body.Address,
    phoneno: req.body.phoneno,
    mail: req.body.mail,
    joiningdate: req.body.joiningdate,
    licenseno: req.body.licenseno,
    licenseEndDate: req.body.licenseEndDate,
    yoe: req.body.yoe,
  };
  var yoe = parseInt(info2.yoe);

  db.query('INSERT INTO drivers (fname,lname,city,state,address,phoneno,email,joiningdate,licenseno,license_end_date,yearofexperience) VALUES ?', [info2.fname,info2.lname,info2.city,info2.state,info2.Address,info2.phoneno,info2.mail,info2.joiningdate,info2.licenseno,info2.licenseEndDate,yoe], function(error, results, fields) {
    if (results.length > 0) {
      console.log('successful');
      
    } else {
      res.send('failed to insert');
    }			
    res.end();
  });

}); 


router.get('/user/add-vehicle', function(req, res, next) {
  res.render('services/addVehicle');
});

router.post('/user/add-vehicle', function(req, res, next) {
  const info = {
    dname: req.body.dname,
    vehiclename: req.body.vehiclename,
    vehicleno: req.body.vehicleno,
    vtype: req.body.vtype,
    bname: req.body.bname,
    ftype: req.body.ftype,
    cof: req.body.cof,
    ino: req.body.ino,
    doi: req.body.doi,
    ied: req.body.ied,
  };
  //console.log(info);
   var mysql =
    "INSERT INTO vehicles (drivername,vehiclename,vehicleno,vehicletype,brandname,fueltype,costoffuel,insuranceno,dateofinsurance,insuranceexpiry) VALUES ?";
  var values = [
    [
      info.dname,
      info.vehiclename,
      info.vehicleno,
      info.vtype,
      info.bname,
      info.ftype,
      parseInt(info.cof),
      info.ino,
      info.doi,
      info.ied,
    ],
  ];
  db.query(mysql, [values], function (err, result) {
    if (err) throw err;
    res.redirect("/user/add-vehicle");
  });

}); 

router.get('/user/booking', function(req, res, next) {
  res.render('services/booking');
});


 router.post("/user/booking", function (req, res, next) {
  console.log("inside the booking post");
  // getting the values
  const payload = {
    uname: req.body.uname,
    mail: req.body.mail,
    no: req.body.no,
    nop: req.body.nop,
    nod: req.body.nod,
    vehicle: req.body.car || req.body.minivan,
    dor: req.body.dor,
    dorr: req.body.dorr,
    destination: req.body.destination,
    pickup: req.body.pickup,
    pickuptime: req.body.pickuptime,
    reason: req.body.reason,
  };
  //console.log("payload", payload);
  var sql =
    "INSERT INTO bookings (uname,email,phoneno,numofpassengers,numofdays,vehicletype,dateofrequirement,dateofreturn,destination,pickupplace,pickuptime,reasonofbooking) VALUES ?";
  var values = [
    [
      payload.uname,
      payload.mail,
      payload.no,
      parseInt(payload.nop),
      parseInt(payload.nod),
      payload.vehicle || payload.vehicle,
      payload.dor,
      payload.dorr,
      payload.destination,
      payload.pickup,
      payload.pickuptime,
      payload.reason,
    ],
  ];
  db.query(sql, [values], function (err, result) {
    if (err) throw err;
    res.redirect("/user/booking");
  });
  
});


router.get('/bookingStatus', function(req, res, next) {
  db.query('SELECT * FROM bookings',function(err,data,fields){
    if(err)
      console.log("Error : %s ",err);
      console.log("data getting inside the bookings", data);
    res.render('services/bookingStatus',{title:"list",userdata:data}); 
  }); 
});

router.get('/bookingHistory', function(req, res, next) {
  res.render('services/bookingHistory');  
});

router.get('/services/driverDetails', function(req, res, next) {
  res.render('services/driverDetails');   
});

router.get('/vehicleDetails', function(req, res, next) {
  res.render('services/vehicleDetails');   
});

module.exports = router;


