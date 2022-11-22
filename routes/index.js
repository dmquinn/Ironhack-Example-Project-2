const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedIn = require("./../middleware/isLoggedIn");
const Post = require("./../models/Post.model");

/* GET home page */
router.get("/", (req, res, next) => {
  User.find().then((users) => console.log(users));
  // Check if the incoming request has a valid cookie/session
  let userIsLoggedIn = false;
  if (req.session.user) {
    userIsLoggedIn = true;
  }
  Post.find()
    .populate("user")
    .then((postsFromDB) => {
      const random = postsFromDB.sort(() => 0.5 - Math.random()).slice(0, 3);

      return random;
    })
    .then((posts) => {
      res.render("index", {
        userIsLoggedIn: userIsLoggedIn,
        user: req.session.user,
        posts,
      });
    });
});

module.exports = router;
