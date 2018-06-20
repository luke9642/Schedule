const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.get('/links', (req, res) => {
    let results = [
        {
            name: "Home",
            to: "/",
            color: "#2E4A62",
            exact: true,
            subLinks: [
                {
                    name: "Home1",
                    to: "/#Home1"
                },
                {
                    name: "Home2",
                    to: "/#Home2"
                },
                {
                    name: "Home3",
                    to: "/#Home3"
                }
            ]
        },
        {
            name: "Profile",
            to: "/profile",
            color: "#944743"
        },
        {
            name: "Notes",
            to: "/Notes",
            color: "#00A591"
        },
        {
            name: "Schedule",
            to: "/Schedule",
            color: "#D2691E"
        },
        {
            name: "Login",
            to: "/Login",
            color: "#005960"
        },
        {
            name: "Logout",
            to: "/Logout",
            color: ""
        }
    ];

    let loggedUser = getLoggedUser(req.cookies);
    let linksToRemove;

    if (loggedUser.loggedIn) {
        linksToRemove = ["Login"];
    } else {
        linksToRemove = ["Profile", "Notes", "Schedule", "Logout"];
    }

    results = results.filter(link => !linksToRemove.includes(link.name));
    res.json(results);
});

router.post('/signup', (req, res) => {
    passport.authenticate('signup', {session: false}, (err, user) => {
        if (err || !user) {
            console.log(err);
            console.log(user);
            return res.status(400).json({
                message: 'Something is not right'
            });
        }

        console.log(req.body.name);
        console.log(req.body.surname);

        user.update({name: req.body.name, surname: req.body.surname}, (err, user1) => {
            console.log(user1);
            req.login(user, {session: false}, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }

                const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
                console.log("444444444444444444444444444444");
                console.log({user, token});
                console.log("55555555555555555555555555555");
                res.cookie('jwt', token).json({status: true, token});
            });
        });



    })(req, res);
});

router.post('/login', (req, res) => {
    passport.authenticate('login', {session: false}, (err, user) => {
        if (err || !user)
            return res.status(401).json({status: false});

        const token = jwt.sign(user.toJSON(), "your_jwt_secret");
        res.cookie("jwt", token, {httpOnly: true}).json({status: true, token});
    })(req, res);
});

router.get('/profile', (req, res) => {
    let result = null;
    let loggedUser = getLoggedUser(req.cookies);

    if (!loggedUser.loggedIn)
        return res.status(401).json();

    getUser(loggedUser).then(user => {
        if (!user)
            return res.status(400).json({status: false, message: "Invalid user"});

        result = {
            login: user.login,
            name: user.name,
            surname: user.surname,
            notesNumber: user.notes.length,
            eventsNumber: user.events.length
        };

        res.json(result);
    });
});

router.get('/notes/:page', (req, res) => {
    const firstPage = parseInt(req.params.page, 10);
    const lastPage = firstPage + 1;
    const elemsOnPage = 4;

    let loggedUser = getLoggedUser(req.cookies);

    if (!loggedUser.loggedIn)
        return res.status(401).json();

    getUser(loggedUser).then(user => {
        const firstElem = firstPage * elemsOnPage;
        const lastElem = lastPage * elemsOnPage;
        const maxPage = Math.floor(user.notes.length/elemsOnPage);
        res.json({notes: user.notes.slice(firstElem, lastElem), maxPage: maxPage});
    });
});

router.post('/note', (req, res) => {
    let note = req.body.note;
    let loggedUser = getLoggedUser(req.cookies);

    if (!loggedUser.loggedIn)
        return res.status(401).json();

    getUser(loggedUser).then(user => {
        if (!user)
            return res.status(400).json({status: false, message: "Invalid user"});

        if (user.notes.find(existingNote => existingNote.name === note.name))
            return res.status(400).json({status: false, message: "Note must have unique name"});

        let notes = user.notes;
        notes.unshift(note);

        user.update({notes: notes}, (err) => {
            if (err) {
                console.log(err);
                return res.json({status: false});
            }
            res.json({status: true});
        });
    });
});

router.put('/note', (req, res) => {
    let loggedUser = getLoggedUser(req.cookies);
    let oldNote = req.body.oldNote;
    let newNote = req.body.newNote;

    if (!loggedUser.loggedIn)
        return res.status(401).json();

    getUser(loggedUser).then(user => {
        if (!user)
            return res.status(400).json({status: false, message: "Invalid user"});

        if (user.notes.filter(note => note.name !== oldNote.name).find(existingNote => existingNote.name === newNote.name))
            return res.status(400).json({status: false, message: "Note must have unique name"});

        user.notes.splice(findIndex(user.notes, oldNote), 1, newNote);

        user.update({notes: user.notes}, (err) => {
            if (err) {
                console.log(err);
                return res.json({status: false});
            }
            res.json({status: true});
        });
    });
});

router.delete('/note', (req, res) => {
    let loggedUser = getLoggedUser(req.cookies);

    if (!loggedUser.loggedIn)
        return res.status(401).json();

    getUser(loggedUser).then(user => {
        if (!user)
            return res.status(400).json({status: false, message: "Invalid user"});

        user.notes.splice(findIndex(user.notes, req.body.note), 1);

        user.update({notes: user.notes}, (err) => {
            if (err) {
                console.log(err);
                return res.json({status: false});
            }

            res.json({status: true});
        });
    });
});

router.get('/events', (req, res) => {
    let loggedUser = getLoggedUser(req.cookies);

    if (!loggedUser.loggedIn)
        return res.status(401).json();

    getUser(loggedUser).then(user => {
        if (!user)
            return res.status(400).json({status: false, message: "Invalid user"});

        let results = {
            monday: {
                events: []
            },
            tuesday: {
                events: []
            },
            wednesday: {
                events: []
            },
            thursday: {
                events: []
            },
            friday: {
                events: []
            },
            saturday: {
                events: []
            },
            sunday: {
                events: []
            }
        };

        Object.keys(results).forEach(key => {
            const events = user.events.filter(event => event.weekday === key);

            if (events)
                results[key].events = events;
        });

        res.json(results);
    });
});

router.post('/event', (req, res) => {
    let loggedUser = getLoggedUser(req.cookies);
    let event = req.body;
    const [startHours, startMinutes] = event.start.split(":");
    const [endHours, endMinutes] = event.end.split(":");
    event = {
        name: event.title,
        period: {
            start: {
                hours: parseInt(startHours, 10),
                minutes: parseInt(startMinutes, 10)
            },
            end: {
                hours: parseInt(endHours, 10),
                minutes: parseInt(endMinutes, 10)
            }
        },
        description: event.description,
        weekday: event.weekday,
        backgroundColor: event.background,
        color: event.color
    };

    if (!loggedUser.loggedIn)
        return res.status(401).json();

    getUser(loggedUser).then(user => {
        if (!user)
            return res.status(400).json({status: false, message: "Invalid user"});

        if (overlaps(user.events, event))
            return res.status(400).json({status: false, message: "New event overlaps existing events"});

        let events = user.events;
        events.push(event);

        user.update({events: events}, (err) => {
            if (err) {
                console.log(err);
                return res.json({status: false});
            }
            res.json({status: true});
        });
    });
});

router.put('/event', (req, res) => {
    let loggedUser = getLoggedUser(req.cookies);
    let oldEvent = req.body.oldEvent;
    let newEvent = req.body.newEvent;
    delete oldEvent.description_brief;
    const [startHours, startMinutes] = newEvent.start.split(":");
    const [endHours, endMinutes] = newEvent.end.split(":");

    let event = {
        name: newEvent.name,
        period: {
            start: {
                hours: parseInt(startHours, 10),
                minutes: parseInt(startMinutes, 10)
            },
            end: {
                hours: parseInt(endHours, 10),
                minutes: parseInt(endMinutes, 10)
            }
        },
        description: newEvent.description,
        weekday: newEvent.weekday,
        backgroundColor: newEvent.background,
        color: newEvent.color
    };

    if (!loggedUser.loggedIn)
        return res.status(401).json();

    getUser(loggedUser).then(user => {
        if (!user)
            return res.status(400).json({status: false, message: "Invalid user"});

        if (overlaps(user.events, event, oldEvent))
            return res.status(400).json({status: false, message: "New event overlaps existing events"});

        user.events.splice(findIndex(user.events, oldEvent), 1, event);

        user.update({events: user.events}, (err) => {
            if (err) {
                console.log(err);
                return res.json({status: false});
            }
            res.json({status: true});
        });
    });
});

router.delete('/event', (req, res) => {
    let loggedUser = getLoggedUser(req.cookies);
    let event = req.body.event;
    delete event.description_brief;

    if (!loggedUser.loggedIn)
        return res.status(401).json();

    getUser(loggedUser).then(user => {
        if (!user)
            return res.status(400).json({status: false, message: "Invalid user"});

        user.events.splice(findIndex(user.events, event), 1);

        user.update({events: user.events}, (err) => {
            if (err) {
                console.log(err);
                return res.json({status: false});
            }
            res.json({status: true});
        });
    });
});

module.exports = router;

overlaps = (events, newEvent, oldEvent) => {
    return events
        .filter(existingEvent => existingEvent.weekday === newEvent.weekday)
        .map(existingEvent => existingEvent.period)
        .filter(period => {

            const start = period.start.hours + period.start.minutes / 60;
            const end = period.end.hours + period.end.minutes / 60;
            const newStart = oldEvent.period.start.hours + oldEvent.period.start.minutes / 60;
            const newEnd = oldEvent.period.end.hours + oldEvent.period.end.minutes / 60;

            return !(start === newStart && end === newEnd);
        })
        .find(period => {
            const start = period.start.hours + period.start.minutes / 60;
            const end = period.end.hours + period.end.minutes / 60;
            const newStart = newEvent.period.start.hours + newEvent.period.start.minutes / 60;
            const newEnd = newEvent.period.end.hours + newEvent.period.end.minutes / 60;

            return (newStart >= start && newStart < end) || (newEnd > start && newEnd <= end);
        });
};

findIndex = (array, newElem) => {
    let tmp = {};
    Object.keys(newElem).sort().forEach((key) => tmp[key] = newElem[key]);
    let elem = tmp;

    return array.findIndex(existingElem => {
        let tmp = {};
        Object.keys(existingElem).sort().forEach((key) => tmp[key] = existingElem[key]);
        existingElem = tmp;
        return JSON.stringify(existingElem) === JSON.stringify(elem);
    });
};

getUser = async user => {
    return await User.findOne({login: user.data.login});
};

getLoggedUser = (cookies) => {
    let decoded = null;
    let result = false;

    try {
        decoded = jwt.verify(cookies.jwt, "your_jwt_secret");

        if (decoded) {
            console.log("Authorized");
            result = true;
        } else {
            console.log("Unauthorized");
            result = false;
        }
    } catch (e) {
        console.log("Unauthorized");
        result = false;
    }

    return {loggedIn: result, data: decoded};
};
