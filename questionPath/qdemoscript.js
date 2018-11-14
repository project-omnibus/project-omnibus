var qfunctions = require('./qfunction.js');
const {Pool, Client} = require('pg');
var http = require('http');

var databaseURL = process.env.OMNIBUS_DATABASE_URL;
var databaseHost = process.env.OMNIBUS_DATABASE_HOST;
var databaseUser = process.env.OMNIBUS_DATABASE_USERNAME;
var databasePassword = process.env.OMNIBUS_DATABASE_PASSWORD;

const pool = new Pool({
	connectionString: databaseURL,
});

pool.query('SELECT NOW()', (err, res) =>{
	console.log(err,res);
	pool.end();
})

http.createServer(function (req, res) {
	fs.readFile('demo.html', function(err, data){
		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write (uc('Hello World'));
    	res.end();	
	});
}).listen(8080);