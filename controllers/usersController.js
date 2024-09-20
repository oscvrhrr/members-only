const db = require("../db/queries");
const bcrypt = require("bcryptjs");


async function createUser(req, res) {
    try {
        const { firstname, lastname, username, password } = req.body;
        const hashedpassword = await bcrypt.hash(password, 10);
        await db.createUserInDb(firstname, lastname, username, hashedpassword);
        res.redirect("/dashboard")
    } catch (err) {
        return console.log('error on user controller', err);
    }
};






module.exports = {
    createUser,
    bcrypt
}