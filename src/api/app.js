var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var port = process.env.PORT || 3001;

var passport = require('passport');
var mongoose = require('mongoose');

// var favicon = require('serve-favicon');
// var flash = require('connect-flash');
// var session = require('express-session');

let cors = require('cors');
var routes = require('./routes/index');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var app = express();

cors({origin: "http://localhost:3000"});
cors({methods: "POST, GET, PUT, DELETE"});


const corsOptions = {
    origin: "http://localhost:3000",
    methods: "POST, GET, PUT, DELETE",
    credentials: true
};

app.options('*', cors(corsOptions));

// app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(session({secret: 'shhsecret'}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

require('./config/passport')(passport);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token");
    // cors({origin: "http://localhost:3000"});
    next();
});

app.use('/', routes);

app.use(function (req, res, next) {
    console.log("111111111");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log("2222222222222");
        console.log(err);
        res.status(err.status || 500);
        res.json(err.message);
    });
}

app.use(function (err, req, res, next) {
    console.log("33333333333");
    res.status(err.status || 500);
    res.json(err.message);
});

app.listen(port);

module.exports = app;
