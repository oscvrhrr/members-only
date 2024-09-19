require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStategy = require("passport-local").Strategy;





const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//parses the req.body
app.use(express.static("public"));
app.use(express.urlencoded({extended: false }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false}));
app.use(passport.session());



app.get("/", (req, res) => {
    res.render("index")
})









const PORT = 4001

app.listen(PORT, () => {
    console.log("server running on port 4001");
})