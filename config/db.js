const mysql = require("mysql2");

let DB = {
    host: "crealab.beget.tech",
    user: "crealab_diplom",
    database: "crealab_diplom",
    password: "tkb&R1RI"
};

module.exports.database = mysql.createPool({
    connectionLimit: 5,
    host: DB.host,
    user: DB.user,
    database: DB.database,
    password: DB.password
});
