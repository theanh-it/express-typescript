"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Index_1 = __importDefault(require("../../base/model/Index"));
class UserModel extends Index_1.default {
    constructor() {
        super("users");
    }
    async getAll() {
        return await this.query(`SELECT * FROM ${this.table}`);
    }
    async getSingle(id) {
        return await this.queryWithParams(`SELECT * FROM ${this.table} WHERE id=?`, [id]);
    }
}
exports.default = UserModel;
