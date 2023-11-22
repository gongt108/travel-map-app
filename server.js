require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const { Loader, Marker } = require('@googlemaps/js-api-loader');
const methodOverride = require('method-override');

// environment variables
SECRET_SESSION = process.env.SECRET_SESSION;
API_KEY = process.env.API_KEY;
const apiOptions = {
	apiKey: process.env.API_KEY,
	version: 'weekly',
	libraries: ['places'],
};

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'));

app.use(flash()); // flash middleware

app.use(
	session({
		secret: SECRET_SESSION, // What we actually will be giving the user on our site as a session cookie
		resave: false, // Save the session even if it's modified, make this false
		saveUninitialized: true, // If we have a new session, we save it, therefore making that true
	})
);

// add passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	console.log(res.locals);
	res.locals.alerts = req.flash();
	res.locals.currentUser = req.user;
	next();
});

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
app.get('/', isLoggedIn, (req, res) => {
	res.redirect('/map');
	// return res.render('index', {
	// 	locations: locations,
	// 	API_KEY: API_KEY,
	// });
});

app.use('/auth', require('./controllers/auth'));
app.use('/map', require('./controllers/map'));

// Add this below /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
	const { id, name, email } = req.user.get();
	res.render('profile', { id, name, email });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
	console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
