const router = require("express").Router();
const User = require("./../models/User.model");
const Post = require("./../models/Post.model");
const axios = require("axios");

router.get("/users/:id", (req, res) => {
  User.find({ _id: req.params.id })
    .then((users) => {
      const user = users[0];
      return user;
    })
    .then((user) => {
      Post.find({ user: user._id }).then((posts) => {
        res.render("users/profile-page", { user, posts });
      });
    });
});

router.get("/users", (req, res) => {
  User.find()
    .populate("posts")
    .then((users) => {
      console.log(users);
    })
    .then((users) => {
      res.render("users/all-users", { users });
    });
});
router.get("/bookfetcher", (req, res) => {
  res.render("bookpage");
});
router.get("/search", (req, res) => {
  const axios = require("axios");
  const { searchTerm } = req.query;
  console.log(searchTerm);
  const options = {
    method: "GET",
    url: `https://www.googleapis.com/books/v1/volumes?q='${searchTerm}`,
  };

  axios
    .request(options)
    .then(function (response) {
      return response.data.items;
    })
    .then((books) => {
      console.log(books[0]);
      res.render("bookpage", { books });
    })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
