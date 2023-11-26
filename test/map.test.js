const expect = require("chai").expect;
const request = require("supertest");
const app = require("../server");
const db = require("../models");

before(function (done) {
  db.sequelize.sync({ force: true }).then(function () {
    done();
  });
});

describe("GET /map", function () {
  it("should return a 302 response after loading map", function (done) {
    request(app).get("/map").expect(302, done);
  });
});

describe("GET /search", function () {
  it("should return a 200 response", function (done) {
    request(app).get("/map/search").expect(200, done);
  });
});

describe("Creating a Bookmark", function () {
  describe("GET /map/search", function () {
    it("should return a 200 response", function (done) {
      request(app).get("/map/search").expect(200, done);
    });
  });

  describe("POST /map", function () {
    it("should redirect to /map on success", function (done) {
      request(app)
        .post("/map")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          lat: "33.2345",
          lng: "-118.2426",
          name: "Los Angeles",
          address: "234 Main St",
          userId: 6,
        })
        .expect("Location", "/map")
        .expect(302, done);
    });

    it("should redirect to /auth/signup on failure", function (done) {
      request(app)
        .post("/map")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          lat: "33.2345",
          lng: "-118.2426",
          name: "Los Angeles",
          userId: 6,
        })
        .expect("Location", "/map")
        .expect(302, done);
    });
  });

  describe("GET /map/edit", function () {
    it("should return a 200 response", function (done) {
      request(app).get("/map").expect(200, done);
    });
  });

  describe("PUT /map/edit", function () {
    it("should redirect to / on success", function (done) {
      request(app)
        .put("/map")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          name: "Los Angeles",
          address: "123 Main St",
        })
        .expect("Location", "/map")
        .expect(302, done);
    });

    it("should redirect to /auth/login on failure", function (done) {
      request(app)
        .post("/auth/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          name: "Los Angeles",
        })
        .expect("Location", "/auth/login")
        .expect(302, done);
    });
  });
});

describe("DELETE /map", function () {
  it("should redirect to /map", function (done) {
    request(app).delete("/map").expect("Location", "/map").expect(302, done);
  });
});
