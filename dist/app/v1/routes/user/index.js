"use strict";
var route = require("express").Router();
const UserController_1 = require("../../controllers/UserController");
var controller = new UserController_1.UserController();
route.get("", controller.index);
route.get("/:id", controller.show);
module.exports = route;
