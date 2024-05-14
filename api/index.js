const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const app = express();
const port = 4000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Post = require("./models/post");

mongoose
  .connect("mongodb+srv://nishant:Nishant@cluster0.wxdfkze.mongodb.net/", {})
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connectig to mongo db", err);
  });

app.listen(port, () => {
  console.log("Server running on port: ", port);
});

//endpoint for registration of the user

app.post("/register", (req, res) => {
  const { name, email, password, image } = req.body;

  // create a new User object
  const newUser = new User({ name, email, password, image });

  // save the user to the database
  newUser
    .save()
    .then(() => {
      res.status(200).json({ message: "User registered successfully" });
    })
    .catch((err) => {
      console.log("Error registering user", err);
      res.status(500).json({ message: "Error registering the user!" });
    });
});

//function to create a token for the user
const createToken = (userId) => {
  // Set the token payload
  const payload = {
    userId: userId,
  };

  // Generate the token with a secret key and expiration time
  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });

  return token;
};

// login functionality of the particular user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // check if the email and password is provided or not
  if (!email || !password) {
    return res.status(404).json({ message: "Email and password is required" });
  }

  //check for that user in the database
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User was not found" });
      }

      if (user.password !== password) {
        return res.status(404).json({ message: "Invalid Password!" });
      }

      const token = createToken(user._id);
      res.status(200).json({ token });
    })
    .catch((error) => {
      console.log("Error in finding the user ", error);
      res.status(500).json({ message: "Internal Server Error!" });
    });
});

//user's profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

//endpoint to create a post
app.post("/create", async (req, res) => {
  try {
    const { description, imageUrl, userId } = req.body;

    const newPost = new Post({
      description: description,
      imageUrl: imageUrl,
      user: userId,
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post Created Successfully", post: newPost });
  } catch (error) {
    console.log("Error create the post ", error),
      res.status(500).json({ message: "Error Creating the post" });
  }
});

//endpoint to fetch all the post
app.get("/all", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name profileImage");
    res.status(201).json({ posts });
  } catch (error) {
    console.log("Error fetching all the posts ", error),
      res.status(500).json({ message: "Error fetching all the posts" });
  }
});


