"use strict";
var route = require("express").Router();
route.get("", (request, response) => {
    return response.json({
        message: "welcome v1"
    });
});
route.use("/user", require("./user"));
module.exports = route;
