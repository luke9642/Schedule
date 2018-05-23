let Period = require("../schedule/period");
let Time = require("../schedule/time");

let express = require('express');
let app = express();
let cors = require('cors');

app.use(cors());

app.use(express.static('public'));

app.get('/links', function(req, res) {
    // res.sendFile( __dirname + "/" + "index.htm" );
    // let obj = JSON.parse(fs.readFileSync('persons.json', 'utf8'));

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
            name: "Contact",
            to: "/Contact"
        },
        {
            name: "Notes",
            to: "/Notes"
        },
        {
            name: "Schedule",
            to: "/Schedule"
        }
    ];

    res.json(results);
});

app.get('/events', function(req, res) {
    // res.sendFile( __dirname + "/" + "index.htm" );
    // let obj = JSON.parse(fs.readFileSync('persons.json', 'utf8'));

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

    let results = {
        monday: {
            events: [
                new Event("English", new Period(new Time(8, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "monday", "#4285F4", "#fff"),
                new Event("Polish", new Period(new Time(9, 30), new Time(10, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "monday", "#FBBC05", "#fff")
            ]
        },
        tuesday: {
            events: [
                new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "tuesday", "#34A853", "#fff"),
                new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "tuesday", "#EA4335", "#fff"),
                new Event("Physics", new Period(new Time(13, 0), new Time(16, 0)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "tuesday", "#EA4335", "#fff")
            ]
        },
        wednesday: {
            events: [
                new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "wednesday"),
                new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "wednesday")
            ]
        },
        thursday: {
            events: [
                new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "thursday"),
                new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "thursday")
            ]
        },
        friday: {
            events: [
                new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "friday"),
                new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "friday")
            ]
        },
        saturday: {
            events: [
                new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "saturday"),
                new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "saturday")
            ]
        },
        sunday: {
            events: [
                new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "sunday"),
                new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "sunday")
            ]
        }
    };

    res.json(results);
});

app.get('/notes', function(req, res) {
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


// app.get('/process_get', function(req, res) {
//     // Prepare output in JSON format
//     let response = {
//         first_name: req.query.first_name,
//         last_name: req.query.last_name
//     };
//
//     fs.readFile('persons.json', 'utf8', function readFileCallback(err, data) {
//         if (err){
//             console.log(err);
//         } else {
//             let obj = JSON.parse(data);
//             obj.push(response);
//             let json = JSON.stringify(obj);
//             fs.writeFile('persons.json', json, 'utf8', function (err) {
//                 if (err)
//                     throw err;
//                 console.log(json);
//                 res.send("<div><h3>Person saved</h3></div><div><a href='/'>Add new person</a><br/><a href='/persons'>Read all persons</a></div>");
//             });
//
//             //    JSON.stringify(obj)
//         }
//     });
// });

let server = app.listen(8081, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log("App listening at http://%s:%s", host, port)
});