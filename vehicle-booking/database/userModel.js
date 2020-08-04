var db = require('../database/connection');
 
// var updatePassword = (password, name, callback) => {
//     var sql = "UPDATE signup SET upass = ? WHERE uname = ?";
//     console.log(sql);
//     db.query(sql, [password, name], function(result) {
//         callback(result);
//     });
// };

var validateUser = (user, password, callback) => {
    var sql = "SELECT uname,upass FROM signup WHERE uname = ? AND upass = ?";
    db.executeQuery(sql, [user, password], function(result) {
        callback(result[0]);
    });
};

module.exports = {

    validateUser
};