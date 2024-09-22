const db = require("../db/queries");
const bcrypt = require("bcryptjs");


async function fetchMessages() {
    try {
     const messages = await db.getMessagesFromDb();
     return messages;
    } catch (err) {
         console.log("error fetching mssgs", err);
    }
};
 

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

async function createMessage(req, res) {
    try {
        const { title, message } = req.body;
        const userId = req.user.id;
        await db.createMessageInDb(userId, title, message)
        res.redirect("/dashboard");
    } catch(err) {
        return console.log('error when creating a message', err);
    }
};

async function getMessagesForDashboard(req, res) {
    try {
        const messages = await fetchMessages();
        res.render("dashboard", { messages, user: req.user })
    } catch (err) {
        return console.log("error getting messages", err);
    }
};

async function getMessagesForLanding(req, res) {
    try {
        const messages = await fetchMessages();
        res.render("index", { messages })
    } catch (err) {
        console.log("error fetching mssgs for landing page", err);
    }
};







module.exports = {
    bcrypt,
    createUser,
    createMessage,
    getMessagesForDashboard,
    getMessagesForLanding
}