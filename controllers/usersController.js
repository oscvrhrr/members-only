const db = require("../db/queries");



async function createUser(req, res) {
    try {
        const { firstname, lastname, username, password } = req.body;
        await db.createUserInDb(firstname, lastname, username, password);
        res.redirect("/")
    } catch (err) {
        return console.log('error on user controller', err);
    }
};






module.exports = {
    createUser
}