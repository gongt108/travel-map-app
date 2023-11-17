require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');

API_KEY = process.env.API_KEY;

// import models
const { user } = require('../models');
const locations = {
	operaHouse: { lat: -33.8567844, lng: 151.213108 },
	tarongaZoo: { lat: -33.8472767, lng: 151.2188164 },
	manlyBeach: { lat: -33.8209738, lng: 151.2563253 },
	hyderPark: { lat: -33.8690081, lng: 151.2052393 },
	theRocks: { lat: -33.8587568, lng: 151.2058246 },
	circularQuay: { lat: -33.858761, lng: 151.2055688 },
	harbourBridge: { lat: -33.852228, lng: 151.2038374 },
	kingsCross: { lat: -33.8737375, lng: 151.222569 },
	botanicGardens: { lat: -33.864167, lng: 151.216387 },
	museumOfSydney: { lat: -33.8636005, lng: 151.2092542 },
	maritimeMuseum: { lat: -33.869395, lng: 151.198648 },
	kingStreetWharf: { lat: -33.8665445, lng: 151.1989808 },
	aquarium: { lat: -33.869627, lng: 151.202146 },
	darlingHarbour: { lat: -33.87488, lng: 151.1987113 },
	barangaroo: { lat: -33.8605523, lng: 151.1972205 },
};

router.get('/', (req, res) => {
	return res.render('map/index', {
		locations: locations,
		API_KEY: API_KEY,
	});
});

router.get('/search', (req, res) => {
	const searchText = req.query.searchBar;
	const googleSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json
	?query=${searchText}
	&key=${API_KEY}`;
	const searchUrl = searchText.split(' ').join('%20');
	console.log(searchUrl);

	return res.render(`map/search`, {
		searchText: '123 Main st',
		searchResults: [
			{
				name: '123 Main St',
				formatted_address: 'Solomon, KS 67480, United States',
				rating: '0',
				user_ratings_total: 0,
			},
			{
				name: 'Banana Republic',
				formatted_address: 'Solomon, KS 67480, United States',
				rating: '0',
				user_ratings_total: 0,
			},
			{
				name: '55 S Market',
				formatted_address: 'Solomon, KS 67480, United States',
				rating: '0',
				user_ratings_total: 0,
			},
		],
	});

	// fetch(googleSearchUrl)
	// 	.then((response) => {
	// 		console.log('--- status ---', response.status);
	// 		return response.json();
	// 	})
	// 	.then((data) => {
	// 		const searchResults = data.results;
	// 		console.log(searchResults);

	// 		return res.render(`map/search`, {
	// 			searchText: searchText,
	// 			searchResults: searchResults,
	// 		});
	// 	})
	// 	.catch((error) => {
	// 		console.log('--- + ----');
	// 		console.log('error: ', error);
	// 	});
});

router.get('/search/:location', (req, res) => {
	const text = req.params.location;
	return res.render('map/searchResult', {
		text: text,
	});
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
		successFlash: 'Welcome back ...',
		failureFlash: 'Either email or password is incorrect',
	})
);

router.post('/signup', async (req, res) => {
	// we now have access to the user info (req.body);
	const { email, name, password, confirmPassword } = req.body; // goes and us access to whatever key/value inside of the object
	if (password === confirmPassword) {
		try {
			const [_user, created] = await user.findOrCreate({
				where: { email },
				defaults: { name, password },
			});

			if (created) {
				// if created, success and we will redirect back to / page
				console.log(`----- ${_user.name} was created -----`);
				const successObject = {
					successRedirect: '/',
					successFlash: `Welcome ${_user.name}. Account was created and logging in...`,
				};
				//
				passport.authenticate('local', successObject)(req, res);
			} else {
				// Send back email already exists
				req.flash('error', 'Email already exists');
				res.redirect('/auth/signup'); // redirect the user back to sign up page to try again
			}
		} catch (error) {
			// There was an error that came back; therefore, we just have the user try again
			console.log('**************Error');
			console.log(error);
			req.flash('error', error.message);
			res.redirect('/auth/signup');
		}
	} else {
		console.log('test failed');
		req.flash(
			'error',
			'Validation error: Please verify that the passwords match.'
		);
		res.redirect('/auth/signup');
	}
});

module.exports = router;
