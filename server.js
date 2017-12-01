// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const google = require('googleapis');
const youtube = google.youtube('v3');

const config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = config.port || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


function search(key, part, message) {   // function which returns the videoId
	return new Promise((resolve, reject) => {
		youtube.search.list({
			auth: key, //youtube API key
			part: part,
			q: message, //Input
			type: 'video'
		}, function (err, data) {
			if (err) {
				reject(err);
				return;
			}
			
			resolve(data.items[0].id ? data.items[0].id.videoId : null);
		})
	});
}

router.get('/:message', async function suggestTrack(message,res) { //function which return the link
    
        const track = await search(config.youtube.key, 'id,snippet', message);
        
    
    
        res.send(`https://www.youtube.com/watch?v=${track}`);
    });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port)
