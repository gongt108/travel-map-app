console.log('still connected, but not in use');
// const form = document.querySelector('form');

// form.onsubmit = function (e) {
// 	e.preventDefault();
// 	const searchInput = document.querySelector('#searchBar');
// 	let searchQuery = searchInput.value;

// 	console.log(GOOGLE_API_KEY);

// 	const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=${GOOGLE_API_KEY}`;

// fetch(unsplashUrl)
// 	.then((response) => {
// 		console.log('--- status ---', response.status);
// 		return response.json();
// 	})
// 	.then((data) => {
// 		// console.log(data.results);
// 		const imageArray = data.results;
// 		console.log(imageArray);
// 		const photoArray = [];

// 		imageArray.forEach(function (image) {
// 			const altDescription = image.alt_description;
// 			const fullImage = image.urls.full;
// 			const nameOfUser = image.user.name;
// 			const userName = image.user.username;
// 			const smallProfileImage = image.user.profile_image.small;
// 			const userLocation = image.user.location;

// 			const newPhoto = new Photo(
// 				altDescription,
// 				fullImage,
// 				nameOfUser,
// 				userName,
// 				smallProfileImage,
// 				userLocation
// 			);

// 			// console.log(newPhoto);

// 			photoArray.push(newPhoto);
// 		});

// 		makePhoto(photoArray);
// 	})
// 	.catch((error) => {
// 		console.log('--- + ----');
// 		console.log();
// 		console.log('--- + ----');
// 	});
// };

// let map;
// const locations = {
// 	operaHouse: { lat: -33.8567844, lng: 151.213108 },
// 	tarongaZoo: { lat: -33.8472767, lng: 151.2188164 },
// 	manlyBeach: { lat: -33.8209738, lng: 151.2563253 },
// 	hyderPark: { lat: -33.8690081, lng: 151.2052393 },
// 	theRocks: { lat: -33.8587568, lng: 151.2058246 },
// 	circularQuay: { lat: -33.858761, lng: 151.2055688 },
// 	harbourBridge: { lat: -33.852228, lng: 151.2038374 },
// 	kingsCross: { lat: -33.8737375, lng: 151.222569 },
// 	botanicGardens: { lat: -33.864167, lng: 151.216387 },
// 	museumOfSydney: { lat: -33.8636005, lng: 151.2092542 },
// 	maritimeMuseum: { lat: -33.869395, lng: 151.198648 },
// 	kingStreetWharf: { lat: -33.8665445, lng: 151.1989808 },
// 	aquarium: { lat: -33.869627, lng: 151.202146 },
// 	darlingHarbour: { lat: -33.87488, lng: 151.1987113 },
// 	barangaroo: { lat: -33.8605523, lng: 151.1972205 },
// };
// function initMap() {
// 	const myLatLng = { lat: -33.8605523, lng: 151.1972205 };

// 	map = new google.maps.Map(document.getElementById('map'), {
// 		center: myLatLng,
// 		zoom: 12,
// 	});

// 	addMarkers(map);
// }

// function addMarkers(map) {
// 	for (const location in locations) {
// 		new google.maps.Marker({
// 			position: locations[location],
// 			map,
// 			title: 'Hello World!',
// 		});
// 	}
// }
