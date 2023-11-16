require('dotenv').config();

const apiKey = process.env.API_KEY;
const apiOptions = {
	apiKey: process.env.API_KEY,
	version: 'weekly',
	libraries: ['places'],
};

const apiLink = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&callback=initMap`;

function generateMap() {
	fetch(
		`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
	)
		.then((response) => {
			function initMap() {
				const myLatLng = { lat: -25.363, lng: 131.044 };

				map = new google.maps.Map(document.getElementById('map'), {
					center: myLatLng,
					zoom: 5,
				});

				new google.maps.Marker({
					position: myLatLng,
					map,
					title: 'Hello World!',
				});

				addMarkers(map);
			}

			function addMarkers(map) {
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

				const markers = [];
				for (const location in locations) {
					new google.maps.Marker({
						position: locations[location],
						map,
						title: 'Hello World!',
					});
				}
			}
		})

		.catch((error) => {
			console.log('error fetching data', error);
		});
}

generateMap();
