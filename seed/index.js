// bin/seeds.js

const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://0.0.0.0/02-node-auth";

const users = [
  {
    username: "inga_mic",
    email: "inga_mic@gmail.com",
    password: "0901602Mm!",
    image: "https://avatars.githubusercontent.com/u/65318378?v=4",
  },
  {
    username: "Nico",
    email: "nico@gmail.com",
    password: "0901602Mm!",
    image: "https://f4.bcbits.com/img/a1372424918_2.jpg",
  },
  {
    username: "bobbobbo",
    email: "bob@gmail.com",
    password: "0901602Mm!",
    image:
      "https://expertphotography.b-cdn.net/wp-content/uploads/2018/02/black-and-white-portrait-2.jpg",
  },
  {
    username: "snakeman",
    email: "snakeman@gmail.com",
    password: "0901602Mm!",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8c846b9a-1cee-46bf-8736-521d8272f9dc/ddz6927-27714435-db3e-4247-8bb2-8f95f3f80c6d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhjODQ2YjlhLTFjZWUtNDZiZi04NzM2LTUyMWQ4MjcyZjlkY1wvZGR6NjkyNy0yNzcxNDQzNS1kYjNlLTQyNDctOGJiMi04Zjk1ZjNmODBjNmQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.EoszESwiaPQwXnU-utvCSp0Fm9H20qEeK3Br9HJlCxw",
  },
  {
    username: "iuhuhu1212",
    email: "iuh@gmail.com",
    password: "0901602Mm!",
  },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    // Create new documents in the books collection
    return User.create(users);
  })
  .then((booksFromDB) => {
    console.log(`Created ${booksFromDB.length} books`);

    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log("DB connection closed!");
  })
  .catch((err) => {
    console.log(`An error occurred while creating books from the DB: ${err}`);
  });
