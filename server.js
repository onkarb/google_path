// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 3000; 				// set the port
var database = require('./config/database'); 			// load the database config

// configuration ===============================================================
// mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

// app.config(function () {
 //...
 // set the 'dbUrl' to the mongodb url that corresponds to the
 // environment we are in
 // app.set('dbUrl', database.db[app.settings.env]);
 // connect mongoose to the mongo dbUrl
 // mongoose.connect(app.get('dbUrl'));
 //...
// });

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT

	// database configuration
	app.set('dbUrl', database.db.development);
	mongoose.connect(app.get('dbUrl'));
});

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
