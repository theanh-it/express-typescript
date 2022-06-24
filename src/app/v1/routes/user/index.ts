var route               = require("express").Router();
var {UserController}    = require("../../controllers/UserController");
var controller          = new UserController();

route.get("", controller.index);
route.get("/:id", controller.show);

export = route;