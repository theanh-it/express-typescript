"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Delete_1 = __importDefault(require("./Delete"));
class Index extends Delete_1.default {
    constructor(table) {
        super(table);
    }
    toSql() {
        if (this._action == "insert")
            return this.toSqlInsert();
        else if (this._action == "update")
            return this.toSqlUpdate();
        else if (this._action == "select")
            return this.toSqlSelect();
        else if (this._action == "delete")
            return this.toSqlDelete();
    }
    run() {
        var data = this.toSql();
        if (data.params.length)
            return this.queryWithParams(data.sql, data.params);
        else
            return this.query(data.sql);
    }
}
exports.default = Index;
