var express = require('express');
var passport = require('passport');
var router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/links', function (req, res) {
    // res.sendFile( __dirname + "/" + "index.htm" );
    // let obj = JSON.parse(fs.readFileSync('persons.json', 'utf8'));
    //
    // fs.readFile('persons.json', function (err, data) {
    //     if (err){
    //         console.log(err);
    //     } else {
    //         let obj = JSON.parse(data);
    //         console.log(obj);
    //
    //         let results = "<div><ul>";
    //         obj.forEach(person => {
    //             results += "<li>" + person.first_name + "  " + person.last_name + "</li>";
    //         });
    //         results += "</ul><div><a href='/'>Add new person</a></div></div>";
    //         res.send(results);
    //     }
    // });

    let results = [
        {
            name: "Home",
            to: "/",
            exact: true,
            subLinks: [
                {
                    name: "Qwe",
                    to: "/#qwe"
                }
            ]
        },
        {
            name: "Profile",
            to: "/Profile"
        },
        {
            name: "Notes",
            to: "/Notes"
        },
        {
            name: "Schedule",
            to: "/Schedule"
        },
        {
            name: "Login",
            to: "/Login"
        }
    ];

    res.json(results);
});

router.get('/events', function (req, res) {
    // res.sendFile( __dirname + "/" + "index.htm" );
    // let obj = JSON.parse(fs.readFileSync('persons.json', 'utf8'));
    //
    // fs.readFile('persons.json', function (err, data) {
    //     if (err){
    //         console.log(err);
    //     } else {
    //         let obj = JSON.parse(data);
    //         console.log(obj);
    //
    //         let results = "<div><ul>";
    //         obj.forEach(person => {
    //             results += "<li>" + person.first_name + "  " + person.last_name + "</li>";
    //         });
    //         results += "</ul><div><a href='/'>Add new person</a></div></div>";
    //         res.send(results);
    //     }
    // });
    //
    //new Event("English", new Period(new Time(8, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "monday", "#4285F4", "#fff"),
    //                 new Event("Polish", new Period(new Time(9, 30), new Time(10, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "monday", "#FBBC05", "#fff")
    //new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "tuesday", "#34A853", "#fff"),
    //                 new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "tuesday", "#EA4335", "#fff"),
    //                 new Event("Physics", new Period(new Time(13, 0), new Time(16, 0)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "tuesday", "#EA4335", "#fff")
    //new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "wednesday"),
    //                 new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "wednesday")
    //new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "thursday"),
    //                 new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "thursday")
    //new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "friday"),
    //                 new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "friday")
    //new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "saturday"),
    //                 new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "saturday")
    //new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "sunday"),
    //                 new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "sunday")

    let results = {
        monday: {
            events: [
                {
                    name: "English",
                    period: {
                        start: {
                            hours: 8,
                            minutes: 0
                        },
                        end: {
                            hours: 9,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "monday",
                    backgroundColor: "#4285F4",
                    color: "#fff"
                },
                {
                    name: "Polish",
                    period: {
                        start: {
                            hours: 9,
                            minutes: 30
                        },
                        end: {
                            hours: 10,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "monday",
                    backgroundColor: "#FBBC05",
                    color: "#fff"
                }
            ]
        },
        tuesday: {
            events: [
                {
                    name: "English",
                    period: {
                        start: {
                            hours: 8,
                            minutes: 0
                        },
                        end: {
                            hours: 8,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "tuesday",
                    backgroundColor: "#34A853",
                    color: "#fff"
                },
                {
                    name: "Polish",
                    period: {
                        start: {
                            hours: 9,
                            minutes: 0
                        },
                        end: {
                            hours: 9,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "tuesday",
                    backgroundColor: "#EA4335",
                    color: "#fff"
                },
                {
                    name: "Physics",
                    period: {
                        start: {
                            hours: 13,
                            minutes: 0
                        },
                        end: {
                            hours: 16,
                            minutes: 0
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "tuesday",
                    backgroundColor: "#EA4335",
                    color: "#fff"
                }
            ]
        },
        wednesday: {
            events: [
                {
                    name: "English",
                    period: {
                        start: {
                            hours: 8,
                            minutes: 0
                        },
                        end: {
                            hours: 9,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "wednesday",
                    backgroundColor: "#4285F4",
                    color: "#fff"
                },
                {
                    name: "Polish",
                    period: {
                        start: {
                            hours: 9,
                            minutes: 30
                        },
                        end: {
                            hours: 10,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "wednesday",
                    backgroundColor: "#FBBC05",
                    color: "#fff"
                }
            ]
        },
        thursday: {
            events: [
                {
                    name: "English",
                    period: {
                        start: {
                            hours: 8,
                            minutes: 0
                        },
                        end: {
                            hours: 9,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "thursday",
                    backgroundColor: "#4285F4",
                    color: "#fff"
                },
                {
                    name: "Polish",
                    period: {
                        start: {
                            hours: 9,
                            minutes: 30
                        },
                        end: {
                            hours: 10,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "thursday",
                    backgroundColor: "#FBBC05",
                    color: "#fff"
                }
            ]
        },
        friday: {
            events: [
                {
                    name: "English",
                    period: {
                        start: {
                            hours: 8,
                            minutes: 0
                        },
                        end: {
                            hours: 9,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "friday",
                    backgroundColor: "#4285F4",
                    color: "#fff"
                },
                {
                    name: "Polish",
                    period: {
                        start: {
                            hours: 9,
                            minutes: 30
                        },
                        end: {
                            hours: 10,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "friday",
                    backgroundColor: "#FBBC05",
                    color: "#fff"
                }
            ]
        },
        saturday: {
            events: [
                {
                    name: "English",
                    period: {
                        start: {
                            hours: 8,
                            minutes: 0
                        },
                        end: {
                            hours: 9,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "saturday",
                    backgroundColor: "#4285F4",
                    color: "#fff"
                },
                {
                    name: "Polish",
                    period: {
                        start: {
                            hours: 9,
                            minutes: 30
                        },
                        end: {
                            hours: 10,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "saturday",
                    backgroundColor: "#FBBC05",
                    color: "#fff"
                }
            ]
        },
        sunday: {
            events: [
                {
                    name: "English",
                    period: {
                        start: {
                            hours: 8,
                            minutes: 0
                        },
                        end: {
                            hours: 9,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "sunday",
                    backgroundColor: "#4285F4",
                    color: "#fff"
                },
                {
                    name: "Polish",
                    period: {
                        start: {
                            hours: 9,
                            minutes: 30
                        },
                        end: {
                            hours: 10,
                            minutes: 30
                        }
                    },
                    description_brief: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet",
                    weekday: "sunday",
                    backgroundColor: "#FBBC05",
                    color: "#fff"
                }
            ]
        }
    };

    res.json(results);
});

router.get('/notes', function (req, res) {
    let results = [
        {
            name: "name1",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula tellus at erat auctor varius. Quisque auctor est molestie, ornare lacus eu, imperdiet neque. Suspendisse potenti. Sed ullamcorper erat sed justo vulputate accumsan. Phasellus molestie purus orci, lobortis pretium risus pretium nec. Suspendisse bibendum libero mauris, vel gravida tortor commodo at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tellus magna, porttitor nec purus sed, imperdiet varius risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec non nisi lacus. Quisque aliquet dolor nisl, non imperdiet sem maximus ac.\n" +
            "\n" +
            "                Praesent luctus justo sed mollis pulvinar. Phasellus libero elit, mollis eget posuere sed, facilisis et nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis egestas nibh, non placerat turpis. Fusce ornare tortor quis libero porta interdum. Phasellus nibh justo, semper a nulla ac, porttitor semper nibh. Duis pretium molestie porta. Nam quis commodo sapien. Nulla blandit elit ut cursus ullamcorper. Pellentesque elementum vitae elit et cursus. Donec orci metus, sodales non sagittis id, sagittis at risus.\n" +
            "\n" +
            "                Aliquam finibus purus velit, ut ullamcorper magna ornare vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi magna massa, sollicitudin ac lacus non, interdum aliquam lectus. Nunc blandit tempus porta. In tempus, lacus ac ullamcorper pretium, metus metus commodo magna, sagittis dignissim massa ante quis ipsum. Integer luctus molestie neque, vitae semper quam ultricies a. Ut ullamcorper sollicitudin lobortis. Donec quis turpis in diam lobortis venenatis eget sed tellus. Praesent vel nisi vitae sem luctus iaculis. Sed a dui nisi. Aliquam ullamcorper auctor ullamcorper.\n" +
            "\n",
            background: "#4285F4",
            color: "#000"
        },
        {
            name: "name2",
            content: "Lorem ipsum",
            background: "#FBBC05",
            color: "#000"
        },
        {
            name: "name3",
            content: "Morbi quis condimentum sem, non iaculis eros. Morbi eget tellus nisl. Mauris vehicula sollicitudin mauris, eu volutpat justo pretium id. Integer sed auctor mi. Fusce ac arcu nunc. Donec eu nunc congue, tincidunt mi ut, ornare odio. Vestibulum tristique imperdiet lacinia. Suspendisse vitae tincidunt dui, in suscipit mauris. Integer nec laoreet nunc.\n" +
            "\n" +
            "                Vivamus at purus vitae nunc bibendum facilisis eget eu sapien. Nunc vitae sapien velit. Fusce iaculis augue eu sodales porta. Fusce mattis justo sit amet odio vehicula, vitae hendrerit urna faucibus. Cras malesuada leo eu vulputate consequat. In id tempor arcu. In elementum dolor ac elit scelerisque ultrices. Suspendisse vitae consequat tortor. Sed facilisis leo non sapien ornare, interdum ultricies urna iaculis. Quisque in dictum nisl. Fusce eget massa nisi. Curabitur ornare mauris eu libero auctor efficitur. Sed aliquam dictum mauris, ac condimentum eros. Nullam a sem elementum arcu luctus eleifend.\n" +
            "\n" +
            "                Curabitur a odio vel elit dictum",
            background: "#34A853",
            color: "#000"
        },
        {
            name: "name4",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula tellus at erat auctor varius. Quisque auctor est molestie, ornare lacus eu, imperdiet neque. Suspendisse potenti. Sed ullamcorper erat sed justo vulputate accumsan. Phasellus molestie purus orci, lobortis pretium risus pretium nec. Suspendisse bibendum libero mauris, vel gravida tortor commodo at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tellus magna, porttitor nec purus sed, imperdiet varius risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec non nisi lacus. Quisque aliquet dolor nisl, non imperdiet sem maximus ac.\n" +
            "\n" +
            "                Praesent luctus justo sed mollis pulvinar. Phasellus libero elit, mollis eget posuere sed, facilisis et nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis egestas nibh, non placerat turpis. Fusce ornare tortor quis libero porta interdum. Phasellus nibh justo, semper a nulla ac, porttitor semper nibh. Duis pretium molestie porta. Nam quis commodo sapien. Nulla blandit elit ut cursus ullamcorper. Pellentesque elementum vitae elit et cursus. Donec orci metus, sodales non sagittis id, sagittis at risus.\n" +
            "\n",
            background: "#EA4335",
            color: "#000"
        },
        {
            name: "name5",
            content: "Lorem ipsum",
            background: "#EA4335",
            color: "#000"
        },
        {
            name: "name6",
            content: "Morbi quis condimentum sem, non iaculis eros. Morbi eget tellus nisl. Mauris vehicula sollicitudin mauris, eu volutpat justo pretium id. Integer sed auctor mi. Fusce ac arcu nunc. Donec eu nunc congue, tincidunt mi ut, ornare odio. Vestibulum tristique imperdiet lacinia. Suspendisse vitae tincidunt dui, in suscipit mauris. Integer nec laoreet nunc.\n" +
            "\n" +
            "                Vivamus at purus vitae nunc bibendum facilisis eget eu sapien. Nunc vitae sapien velit. Fusce iaculis augue eu sodales porta. Fusce mattis justo sit amet odio vehicula, vitae hendrerit urna faucibus. Cras malesuada leo eu vulputate consequat. In id tempor arcu. In elementum dolor ac elit scelerisque ultrices. Suspendisse vitae consequat tortor. Sed facilisis leo non sapien ornare, interdum ultricies urna iaculis. Quisque in dictum nisl. Fusce eget massa nisi. Curabitur ornare mauris eu libero auctor efficitur. Sed aliquam dictum mauris, ac condimentum eros. Nullam a sem elementum arcu luctus eleifend.\n" +
            "\n" +
            "                Curabitur a odio vel elit dictum",
            background: "#34A853",
            color: "#000"
        },
    ];

    res.json(results);
});

// router.get('/', function(req, res, next) {
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   console.log("21476089127692158762198721565218972512");
//   let results = [
//       {
//           name: "Home",
//           to: "/",
//           exact: true,
//           subLinks: [
//               {
//                   name: "Qwe",
//                   to: "/#qwe"
//               }
//           ]
//       },
//       {
//           name: "Profile",
//           to: "/Profile"
//       },
//       {
//           name: "Notes",
//           to: "/Notes"
//       },
//       {
//           name: "Schedule",
//           to: "/Schedule"
//       }
//   ];
//
//   res.json(results);
// });

// router.get('/login', function (req, res, next) {
//     // req.query
//     console.log("login");
//     res.render('login.ejs', {message: req.flash('loginMessage')});
// });

router.get('/signup', function (req, res) {
    res.render('signup.ejs', {message: req.flash('loginMessage')});
});

router.get('/profile', function (req, res) {
    const result = {
        name: "Łukasz",
        surname: "Kowalski",
        notesNumber: 10,
        eventsNumber: 13
    };

    res.json(result);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
            console.log("444444444444444444444444444444");
            console.log({user, token});
            console.log("55555555555555555555555555555");
            return res.json({user, token});
        });

    })(req, res);
});

// router.post('/login', passport.authenticate('local-login', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     failureFlash: true,
// }));

// router.post('/login', passport.authenticate('jwt', { session: false },
//     function(req, res) {
//         console.log("login");
//         console.log(req);
//         console.log(res);
//
//         // res.send(req.user.profile);
//     })
// );

router.post('/login', function(req, res, next) {
    console.log("00000000000000000000000000000000000000");
    passport.authenticate('login', {session: false}, (err, user, info) => {
        console.log("dsadsadsadsadasdsadassdadsdsaasdadsssadsdsdaadsdadsads");
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
            console.log("444444444444444444444444444444");
            console.log({user, token});
            console.log("55555555555555555555555555555");
            return res.json({user, token});
        });

    })(req, res);
});



module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
