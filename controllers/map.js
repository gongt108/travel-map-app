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

// router.get('/search/:location', (req, res) => {
// 	const text = req.params.location;
// 	return res.render('map/searchResult', {
// 		text: text,
// 	});
// });

router.post('/', (req, res) => {
	// print the data that the user submits
	// console.log(req.body);
	const { id, name, email } = req.user.get();
	console.log(id);
	let coordinates = { lat: 34.0549, lng: -118.2426 };

	// console.log('new account', newAccount);
	// fs.readFile('./data/accounts.json', 'utf8', (error, data) => {
	// 	if (error) {
	// 		return res.json({ message: 'error occurred. Please try again.' });
	// 	} else {
	// 		data = JSON.parse(data);
	// 		let index = data.length;
	// 		newAccount.id = index;
	// 		data.push(newAccount);
	// 		let stringData = JSON.stringify(data);
	// 		// write the data to the file
	// 		fs.writeFile(
	// 			'./data/accounts.json',
	// 			stringData,
	// 			'utf8',
	// 			(error, result) => {
	// 				return res.redirect(`accounts/${newAccount.accountNumber}`);
	// 			}
	// 		);
	// 	}
	// });
});

router.put('/:accountNumber', (req, res) => {
	// find the account with the accountNumber
	// grab the account by accountNumber and update
	let updatedAccount = {};
	fs.readFile('./data/accounts.json', 'utf8', (error, data) => {
		if (error) {
			return res.json({ message: 'Error occured. Please try again...' });
		} else {
			data = JSON.parse(data); // array of objects(account)
			// use map to iterate through and update the fields
			newData = data.map((account) => {
				// check to see if the account number is the same.
				if (account.accountNumber === req.params.accountNumber) {
					// change the data
					account.pin = req.body.pin || account.pin; // if there is a pin to change, then it will update
					account.amount = Number(req.body.amount || account.amount);
					account.accountName = req.body.accountName || account.accountName;
					updatedAccount = { ...account };
					return account;
				} else {
					return account;
				}
			});

			// write the new array of objects inside of the accounts.json file
			fs.writeFile(
				'./data/accounts.json',
				JSON.stringify(newData),
				'utf8',
				(error, result) => {
					return res.redirect(`/accounts/${req.params.accountNumber}`);
				}
			);
		}
	});
});

router.delete('/:accountNumber', (req, res) => {
	const accountNumber = req.params.accountNumber;

	fs.readFile('./data/accounts.json', 'utf8', (error, data) => {
		if (error) {
			return res.json({ message: 'Error occurred. Please try again' });
		} else {
			data = JSON.parse(data);

			// Use the filter method to find the account with the specified ID
			const accountsToKeep = data.filter(
				(account) => account.accountNumber !== accountNumber
			);

			// If the filtered array has the same length as the original, the account was not found
			if (accountsToKeep.length === data.length) {
				return res.status(404).json({ message: 'Account not found' });
			} else {
				// Update the data with the filtered accounts
				data = accountsToKeep;
				const stringData = JSON.stringify(data);

				// Write the updated data to the file
				fs.writeFile(
					'./data/accounts.json',
					stringData,
					'utf8',
					(error, result) => {
						return res.redirect('/accounts');
					}
				);
			}
		}
	});
});

// export router
module.exports = router;
