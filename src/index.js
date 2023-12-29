const path = require('path');

const hbs = require('hbs');

const express = require('express');

// const geocode = require('./utils/geocode.js');
const getForecast = require('./utils/forecast.js');

const app = express();

var errorMessage = 'Page not found';

const port = process.env.PORT || 3000;

// define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '/views');
const partialsPath = path.join(__dirname, '/views/partials');
// setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(publicPath));
// setup routes/pages using paths
// home page
app.get('/', (req, res) => {
	res.render('welcome', {
		title: "Welcome to Surya's Weather App!",
		name: 'Surya K.'
	});
});
app.get('/aboutUs', (req, res) => { // aboutUs
	res.render('aboutUs', {
		title: 'Weather App About',
		name: 'Surya K.'
	});
});
// weather starts
app.get('/weather', (req, res) => {
			if (!req.query.address) { // if starts
				return res.send({ // response send starts
					code: 500,
					error: 'Bad request! Must provide address.'
				}); // response ends
			   
			} // if ends
			getForecast(req.query.address, (error, forecast) => { // forecast starts
				if (error) { // if starts
					return res.send({
						code: 500,
						error
					}); // response ends
				} // if ends
				res.send({ // response starts
					// address: req.query.address,
					forecast: forecast
				}); // response ends
			});
		}); // weather ends
app.get('/help', (req, res) => { // help
			res.render('help', {
				title: 'Weather Help',
				name: 'Surya K.'
			});
		});

app.get('/help/*', (req, res) => { // help error
			res.render('404', {
				title: '404 Help',
				name: 'Surya K.',
				errorMessage: 'Help article not found'
			});
		});


app.get('*', (req, res) => { // app error
			res.render('404', {
				title: '404 Error',
				name: 'Surya K.',
				errorMessage
			});
		}); 

app.listen(port, () => {
		console.log('Starting server on port ' + port);
});