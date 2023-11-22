require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const isLoggedIn = require("../middleware/isLoggedIn");
const db = require("../models");

API_KEY = process.env.API_KEY;

// import models
const { user } = require("../models");
const { FLOAT } = require("sequelize");
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

router.get("/", isLoggedIn, (req, res) => {
  const { id, name } = req.user.get();
  return res.render("map/index", {
    locations: locations,
    API_KEY: API_KEY,
    userId: id,
    name: name,
  });
});

router.get("/search", (req, res) => {
  const searchText = req.query.searchBar;
  const googleSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json
	?query=${searchText}
	&key=${API_KEY}`;
  const searchUrl = searchText.split(" ").join("%20");

  return res.render(`map/search`, {
    searchText: "123 Main st",
    searchResults: [
      {
        name: "123 Main St",
        formatted_address: "Solomon, KS 67480, United States",
        rating: "0",
        user_ratings_total: 0,
      },
      {
        name: "Banana Republic",
        formatted_address: "Solomon, KS 67480, United States",
        rating: "0",
        user_ratings_total: 0,
      },
      {
        name: "55 S Market",
        formatted_address: "Solomon, KS 67480, United States",
        rating: "0",
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

router.get("/edit/:bookmarkId", isLoggedIn, (req, res) => {
  const { id } = req.user.get();
  const bookmarkId = req.params.bookmarkId;
  db.bookmark
    .findOne({
      where: {
        id: bookmarkId,
        userId: id,
      },
    })
    .then((bookmark) => {
      return res.render("map/edit", {
        userId: id,
        bookmarkId: bookmarkId,
        bookmark: bookmark,
      });
    });
});

router.get("/delete", (req, res) => {
  return res.render("map/delete");
});

router.post("/", isLoggedIn, (req, res) => {
  // print the data that the user submits
  // console.log(req.body);
  const { id, name, email } = req.user.get();
  console.log(id);
  let coordinates = { lat: 34.0549, lng: -118.2426 };
  db.user.findOne({ where: { id: id } }).then((user) => {
    user
      .createBookmark({
        lat: coordinates.lat,
        lng: coordinates.lng,
        name: "home",
        userId: id,
      })
      .then((newBookmark) => {
        console.log("here is the new bookmark", newBookmark.toJSON());
      });
  });
});

router.put("/edit/:id", isLoggedIn, (req, res) => {
  const { id, name } = req.user.get();

  let updatedBookmark = {};
  if (req.body.name !== null && req.body.name != "") {
    updatedBookmark["name"] = req.body.nickname;
  }
  if (req.body.latitude !== null && req.body.latitude != "") {
    let lat = parseFloat(req.body.latitude).toFixed(4);
    updatedBookmark["lat"] = req.body.ew === "west" ? lat * -1 : lat;
  }
  if (req.body.longitude !== null && req.body.longitude != "") {
    let lng = parseFloat(req.body.longitude).toFixed(4);
    updatedBookmark["lng"] = req.body.ns === "south" ? lng * -1 : lng;
  }

  try {
    db.bookmark.update(
      { ...updatedBookmark },
      {
        where: { id: req.params.id, userId: id },
      }
    );
    res.redirect("/map");
  } catch (error) {
    console.log("error", error);
  }
});

router.delete("/delete/:bookmarkId", (req, res) => {
  try {
    db.bookmark.destroy({
      where: { id: req.params.bookmarkId, userId: 6 },
    });
    res.render("/map");
  } catch (error) {
    console.log("error", error);
  }
});

// export router
module.exports = router;
