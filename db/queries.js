const pool = require("./pool");



async function createUserInDb(firstname, lastname, username, password) {
    try {
        await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
        [firstname, lastname, username, password]);
    } catch(err) {
        return console.log("error in create user query", err)
    };
}

async function createMessageInDb(userId, title, message) {
    await pool.query("INSERT INTO messages (user_id, title, message, timestamp) VALUES($1, $2, $3, NOW())", [userId, title, message]);
}

async function getMessagesFromDb() {
    const { rows } = await pool.query("SELECT messages.id, messages.title, messages.message, users.username FROM messages JOIN users ON messages.user_id = users.id");
    return rows;
}



module.exports = {
    createUserInDb,
    createMessageInDb,
    getMessagesFromDb
}