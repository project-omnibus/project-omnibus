var qfunctions = require('./qfunction.js');
var pg = require('pg');
pg.defaults.ssl = true;
var http = require('http');


var databaseURL = process.env.OMNIBUS_DATABASE_URL;
var databaseHost = process.env.OMNIBUS_DATABASE_HOST;
var databaseUser = process.env.OMNIBUS_DATABASE_USERNAME;
var databasePassword = process.env.OMNIBUS_DATABASE_PASSWORD;

var client = new pg.Client({
	connectionString: databaseURL,
});

client.connect();



http.createServer(function (req, res) {

		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write ('Hello World');
    	res.end();	

}).listen(8080);