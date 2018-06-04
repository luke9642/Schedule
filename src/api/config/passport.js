var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

module.exports = function (passport) {
    // passport.serializeUser(function (user, done) {
    //     done(null, user.id);
    // });
    //
    // passport.deserializeUser(function (id, done) {
    //     User.findById(id, function (err, user) {
    //         done(err, user);
    //     });
    // });

    // passport.use('local-signup', new LocalStrategy({
    //         usernameField: 'login',
    //         passwordField: 'password',
    //         passReqToCallback: true,
    //     },
    //     function (req, login, password, name, surname, done) {
    //         console.log("----------------------------------------------------");
    //         console.log(login);
    //         console.log(password);
    //         console.log(name);
    //         console.log(surname);
    //         console.log("----------------------------------------------------");
    //
    //         process.nextTick(function () {
    //             User.findOne({'login': login}, function (err, user) {
    //                 if (err)
    //                     return done(err);
    //                 if (user) {
    //                     return done(null, false, req.flash('signupMessage', 'That login is already taken.'));
    //                 } else {
    //                     var newUser = new User();
    //                     newUser.login = login;
    //                     newUser.password = newUser.generateHash(password);
    //                     newUser.save(function (err) {
    //                         if (err)
    //                             throw err;
    //                         return done(null, newUser);
    //                     });
    //                 }
    //             });
    //         });
    //     })
    // );
    //
    // passport.use('local-login', new LocalStrategy({
    //         usernameField: 'login',
    //         passwordField: 'password',
    //         passReqToCallback: true,
    //     },
    //     function (req, login, password, done) {
    //         User.findOne({'login': login}, function (err, user) {
    //             if (err)
    //                 return done(err);
    //             if (!user)
    //                 return done(null, false, req.flash('loginMessage', 'No user found.'));
    //             if (!user.validPassword(password))
    //                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    //             return done(null, user);
    //         });
    //     })
    // );

    passport.use("login", new JwtStrategy(opts, function(jwt_payload, done) {
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
};
