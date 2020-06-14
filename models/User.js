const { database } = require('../config/db');

module.exports.getUser = function (user) {

      database.query('SELECT * FROM `users` WHERE `email` LIKE ?', user, function (error, results, fields) {
         if (error) {
             console.log('Err: ' + error);
         }else{
             return results.length > 0;
         }
     })

};
