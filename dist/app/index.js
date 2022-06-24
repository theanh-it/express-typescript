"use strict";
var route = require("express").Router();
route.get("/", (request, response) => {
    console.log(this);
    return response.json({
        message: "welcome"
    });
});
route.use("/v1", require("./v1/routes"));
module.exports = route;
