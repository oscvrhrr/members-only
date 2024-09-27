require("dotenv").config();
const path = require("node:path");
const express = require("express");
const passport = require("./passportConfig")
const session = require("express-session");
const pool = require("./db/pool");
const isAuth = require("./middleware/isAuth");





const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//parses the req.body
app.use(express.static("public"));
app.use(express.urlencoded({extended: false }));
app.use(session({
    store: new (require("connect-pg-simple")(session))({
        pool: pool,
        tableName: "session"
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(passport.session());

const userController = require("./controllers/usersController");

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});



app.get("/", (req, res) => {
    userController.getMessagesForLanding(req, res);
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


app.get("/dashboard", isAuth, (req, res) => {
    userController.getMessagesForDashboard(req, res);
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

app.get("/message", (req, res) => {
    res.render("create-message");
})

app.post("/message", (req, res) => {
    userController.createMessage(req, res)
})








const PORT = 4001

app.listen(PORT, () => {
    console.log("server running on port 4001");
})