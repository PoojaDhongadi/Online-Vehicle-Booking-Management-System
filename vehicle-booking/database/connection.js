
var mysql = require('mysql');
var connection = mysql.createConnection({
   host : 'localhost',
   user : 'root',
   password : 'password',
   database : 'mydatabase'
 }); 
connection.connect(); 

module.exports = connection;