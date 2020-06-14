const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/jwt');
const { database } = require('../config/db');


const options = {
    // Стратегия паспорта о том что токен будет в header
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options,  (payload, done) => {
            database.query('SELECT * FROM `users` WHERE `id` LIKE ?', payload.userId, function (error, results, fields) {
                if (error) {
                    console.log('Err: ' + error);
                }else{
                    if (results.length > 0){
                        const user = results[0];
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                }
            })
        })
    )
}
