"use strict";
// var Controller  = require("../../base/Controller");
// var UserModel = require("../models/UserModel");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const Controller_1 = __importDefault(require("../../base/Controller"));
const UserModel_1 = require("../models/UserModel");
class UserController extends Controller_1.default {
    constructor() {
        var model = new UserModel_1.UserModel();
        super(model);
    }
}
exports.UserController = UserController;
