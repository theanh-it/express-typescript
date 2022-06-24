import UserController from "../../controllers/UserController";
var route       = require("express").Router();
var controller  = new UserController();

route.get("", controller.index);
route.get("/:id", controller.show);
route.post("", controller.create);

export = route;