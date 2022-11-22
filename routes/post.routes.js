const router = require("express").Router();
const Post = require("./../models/Post.model");
const fileUploader = require("../config/cloudinary.js");
const User = require("../models/User.model");

router.get("/create-post", (req, res) => {
  res.render("posts/create-post-form");
});

router.post("/create-post", fileUploader.single("post-photo"), (req, res) => {
  const { title, artist, description, category, price } = req.body;
  const user = req.session.user;
  const photo = req.file.path;
  console.log(req.session);

  Post.create({
    title,
    artist,
    description,
    photo,
    user,
    category,
    price,
  })
    .then((post) => {
      // console.log("post", user, req.session);

      User.findByIdAndUpdate(
        user._id,
        { $push: { posts: post } },
        { safe: true, upsert: true, new: true }
      );
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(`Error while creating a new post: ${error}`));
});

router.get("/all-posts", (req, res) => {
  Post.find()
    .populate("user")
    .then((postsFromDB) => {
      res.render("posts/all-posts", { posts: postsFromDB });
    });
});

module.exports = router;
