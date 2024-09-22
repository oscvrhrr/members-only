const db = require("./db/pool")
const passport = require("passport");
const LocalStategy = require("passport-local").Strategy;
const { bcrypt } = require("./controllers/usersController")


//SETUP LOCAL STRATEGY
passport.use (
    new LocalStategy( async(username, password, done) => {
        try {
            const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [username]);
            const user = rows[0];
            const match = await bcrypt.compare(password, user.password);

            if (!user) {
                return done(null, false, { message: "Incorrect username"});
            }
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        }   catch (err) {
            return done(err)
        }
    })
);

//SETUP PASSPORT SERIALIZE USER
passport.serializeUser((user, done) => {
    done(null, user.id);
});


//SETUP PASSPORT DESERIALIZE USER

passport.deserializeUser( async(id, done) => {
    try {
        const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];

        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
