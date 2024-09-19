const pool = require("./pool");



async function createUserInDb(firstname, lastname, username, password) {
    try {
        await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
        [firstname, lastname, username, password]);
    } catch(err) {
        return console.log("error in create user query", err)
    };
}



module.exports = {
    createUserInDb
}