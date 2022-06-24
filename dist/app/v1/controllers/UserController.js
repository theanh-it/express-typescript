"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const Controller_1 = __importDefault(require("../../base/Controller"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
class UserController extends Controller_1.default {
    constructor() {
        var model = new UserModel_1.default();
        super(model);
    }
    index(request, response) {
        this.model
            .select(["*"])
            //.where({column: "username", value: "admin"})
            //.first()
            .run()
            .then((results) => {
            response.json(results);
        })
            .catch((error) => {
        });
    }
}
exports.UserController = UserController;
