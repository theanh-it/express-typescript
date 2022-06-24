"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var Model = require("../../base/Model");
class UserModel extends Model {
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
exports.UserModel = UserModel;
