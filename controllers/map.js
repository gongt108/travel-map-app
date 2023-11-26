require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const isLoggedIn = require("../middleware/isLoggedIn");
const db = require("../models");

// API
API_KEY = process.env.API_KEY;

// import models
const { user } = require("../models");
const { FLOAT } = require("sequelize");
const bookmark = require("../models/bookmark");
let locations = {};

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const { id, name } = req.user.get();
    const user = await db.user.findOne({ where: { id: id } });
    console.log("-----><------");
    const bookmarks = await user.getBookmarks();
    console.log("checking bookmarks", bookmarks);
    locations = {};

    // const bookmarks = {};

    if (Object.keys(bookmarks).length > 0) {
      console.log("running this section of code");

      await Promise.all(
        bookmarks.map(async (bookmark) => {
          let bookmarkId = bookmark.id;
          let latitude = bookmark.lat;
          let longitude = bookmark.lng;
          locations[bookmarkId] = [
            { nickname: bookmark.name },
            { coordinates: { lat: latitude, lng: longitude } },
            { address: bookmark.address },
          ];
        })
      );

      Promise.resolve().then(() => {
        res.render("map/index", {
          locations: locations || "",
          API_KEY: API_KEY,
          userId: id,
          name: name,
        });
      });
    } else {
      console.log("bookmark is empty");
      console.log("id:", id);
      res.render("map/index", {
        locations: locations || {},
        API_KEY: API_KEY,
        userId: id,
        name: name,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/search", (req, res) => {
  const searchText = req.query.searchBar;
  const googleSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json
	?query=${searchText}
	&key=${API_KEY}`;

  fetch(googleSearchUrl)
    .then((response) => {
      console.log("--- status ---", response.status);
      return response.json();
    })
    .then((data) => {
      const searchResults = data.results;

      return res.render(`map/search`, {
        searchText: searchText,
        searchResults: searchResults,
      });
    })
    .catch((error) => {
      console.log("--- + ----");
      console.log("error: ", error);
    });
});

router.get("/new", isLoggedIn, (req, res) => {
  const { id } = req.user.get();
  const latitutde = req.query.lat;
  const longitude = req.query.lng;

  console.log(latitutde, longitude);
  return res.render("map/new", { lat: latitutde, lng: longitude });
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

router.get("/delete/:bookmarkId", isLoggedIn, (req, res) => {
  const { id } = req.user.get();
  const bookmarkId = req.params.bookmarkId;

  // Use the fetch function to make the API request

  db.bookmark
    .findOne({
      where: {
        id: bookmarkId,
        userId: id,
      },
    })
    .then((bookmark) => {
      return res.render("map/delete", {
        bookmarkId: bookmarkId,
        bookmark,
        bookmark,
      });
    });
});

router.post("/", isLoggedIn, (req, res) => {
  const { id } = req.user.get();
  console.log(id);

  //   let coordinates = { lat: 34.0549, lng: -118.2426 };

  db.user.findOne({ where: { id: id } }).then((user) => {
    user
      .createBookmark({
        lat: req.query.lat,
        lng: req.query.lng,
        name:
          req.body.nickname ||
          `New Bookmark${Math.floor(Math.random() * 1000000)}`,
        address: req.body.address,
        userId: id,
      })
      .then((newBookmark) => {
        console.log("here is the new bookmark", newBookmark.toJSON());
        res.redirect("/");
      });
  });
});

router.put("/edit/:bookmarkId", isLoggedIn, (req, res) => {
  const { id } = req.user.get();

  let updatedBookmark = {};
  if (req.body.name !== null && req.body.name != "") {
    updatedBookmark["name"] = req.body.nickname;
  }
  if (req.body.address !== null && req.body.address != "") {
    updatedBookmark["address"] = req.body.address;
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
        where: { id: req.params.bookmarkId, userId: id },
      }
    );
    res.redirect("/map");
  } catch (error) {
    console.log("error", error);
  }
});

router.delete("/delete/:bookmarkId", isLoggedIn, (req, res) => {
  const { id, name } = req.user.get();

  try {
    db.bookmark.destroy({
      where: { id: req.params.bookmarkId, userId: id },
    });
    console.log("deleted");

    res.redirect("/map");
  } catch (error) {
    console.log("error", error);
  }
});

// export router
module.exports = router;
