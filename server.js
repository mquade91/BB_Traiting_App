    var express = require('express')
    var app = express()
    var passport = require('passport')
    var session = require('express-session')
    var bodyParser = require('body-parser')
    var env = require('dotenv').load()
    var exphbs = require('express-handlebars')
    var nodeadmin = require('nodeadmin')

    app.use(nodeadmin(app));

    //For BodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    // For Passport
    app.use(session({ secret: 'jammin', resave: true, saveUninitialized: true })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions


    //For Handlebars
    app.set('views', './app/views')
    app.engine('hbs', exphbs({ extname: '.hbs' }));
    app.set('view engine', '.hbs');


    app.get('/', function(req, res) {
     res.render('./home/home');
    });


    //Models
    var models = require("./app/models");


    //Routes
    var authRoute = require('./app/routes/auth.js')(app, passport);
    //load passport strategies
    require('./app/config/passport/passport.js')(passport, models.user);

    //ITEM api routes (not running since file has not been finished)
    require("./app/routes/item-api-routes.js")(app);


    //Sync Database
    models.sequelize.sync({ force: true }).then(function() {
     console.log('Nice! Database looks fine');

    }).catch(function(err) {
     console.log(err, "Something went wrong with the Database Update!");
    });



    app.listen(8080, function(err) {
     if (!err)
      console.log("Site is live");
     else console.log(err);

    });
    