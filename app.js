require("dotenv").config();
const path = require("node:path");
const express = require("express");
const passport = require("./passportConfig")
const session = require("express-session");








const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//parses the req.body
app.use(express.static("public"));
app.use(express.urlencoded({extended: false }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false}));
app.use(passport.session());





const userController = require("./controllers/usersController");


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}) )


app.get("/dashboard", (req, res) => {
    res.render("dashboard", { user: req.user});
});

app.get("/signup", (req, res) => {
    res.render("sign-up-form");
});

app.post("/signup", (req, res) => {
    userController.createUser(req, res)
})

app.get("/login", (req, res) => {
    res.render("log-in");
})





const PORT = 4001

app.listen(PORT, () => {
    console.log("server running on port 4001");
})