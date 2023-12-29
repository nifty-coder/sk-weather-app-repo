const request = require('request');
const apiKey = require('./apiKey');
const log = console.log;

const getForecast = (place, callback) => {
	const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + place + '&APPID=' + apiKey + '&units=imperial';
	request({url, json: true}, (error, {body}) => {
		const isErr = body.cod == '404' || body.cod == '401';
		if (error) {
			callback('Our weather server is currently down! Please try again.');
		} else if (isErr) {
			callback(body.message);
		} else {
			// var temp = body.currently.temperature;
			// var precip = body.currently.precipProbability;
			// var daily = body.daily.data[0].summary;
			var temp = body.main.temp;
			var precip = body.main.humidity;	
			var description = body.weather[0].main;
			if (description == 'Clear') {
				description = 'clear';
			} else if (description == 'Clouds') {
				description = 'cloudy';
			} else if (description == 'Rain') {
				description = 'rainy';
			} else if (description == 'Snow') {
				description = 'snowy';
			} else if (description == 'Thunderstorm') {
				description = 'thunderstormy';
			} else if (description == 'Drizzle') {
				description = 'drizzly';
			} else if (description == 'Mist') {
				description = 'misty';
			} else if (description == 'Smoke') {
				description = 'smoky';
			} else if (description == 'Haze') {
				description = 'hazy';
			} else if (description == 'Dust') {
				description = 'dusty';
			} else if (description == 'Fog') {
				description = 'foggy';
			} else {
				description = 'unknown';
			}
			callback(isErr, "It is currently " + temp + " degrees fahrenheit. There is " + precip + "% humidity. The weather is " + description + ".");
		//	callback(undefined, daily + ' It is currently ' + temp + ' degrees fahrenheit. There is ' + precip + '% chance of rain.');
		}
	});
};

module.exports = getForecast;
