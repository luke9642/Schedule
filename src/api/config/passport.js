var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


module.exports = function (passport) {
    passport.use('signup', new LocalStrategy({},
        function (login, password, done) {
            console.log("passport signup");
            console.log(login);
            console.log(password);
            console.log(done);

            process.nextTick(function() {
                User.findOne({'login': login}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        console.log("login already taken");
                        return done(null, false);
                    } else {
                        let newUser = new User();
                        newUser.login = login;
                        newUser.password = newUser.generateHash(password);
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        })
    );

    passport.use("login", new LocalStrategy({}, function(login, password, done) {
        User.findOne({login: login}, function(err, user) {
            if (err)
                return done(err, false);

            if (user && user.validPassword(password))
                return done(null, user);
            else
                return done(null, false);
        });
    }));

    // passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //     console.log("jwt");
    //     User.findOne({id: jwt_payload.sub}, function(err, user) {
    //         if (err) {
    //             return done(err, false);
    //         }
    //         if (user) {
    //             return done(null, user);
    //         } else {
    //             return done(null, false);
    //             // or you could create a new account
    //         }
    //     });
    // }));
};
