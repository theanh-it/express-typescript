"use strict";
const config = require("../config.json");
const dotenv = require("dotenv");
const express = require("express");
const mysql = require("mysql");
dotenv.config();
var db = mysql.createConnection(config.db.mysql);
db.connect((error) => {
    if (error)
        throw error;
    globalThis.DB = db;
    const app = express();
    const port = process.env.PORT || config.server.port;
    app.use(require("./app/index"));
    app.listen(port, () => {
        console.log("server runing with http://localhost:" + port);
    });
});
