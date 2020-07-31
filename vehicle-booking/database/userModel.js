var db = require('../database/connection');
 
var updatePassword = (password, name, callback) => {
    var sql = "UPDATE signup SET upass = ? WHERE uname = ?";
    console.log(sql);
    db.query(sql, [password, name], function(result) {
        callback(result);
    });
};

module.exports = updatePassword;