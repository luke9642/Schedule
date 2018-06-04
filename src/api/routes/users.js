var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res, next) {
    User.find({}, function(err, allUsers) {
        if(err)
            throw err;
        res.render('users.ejs', { users: allUsers });
    })
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;
