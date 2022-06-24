"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Update_1 = __importDefault(require("./Update"));
class Delete extends Update_1.default {
    constructor(table) {
        super(table);
    }
    delete() {
        this._action = "delete";
        return this;
    }
    toSqlDelete() {
        var params = [];
        var where = this._where.reduce((res, obj) => {
            if (res && obj) {
                if (obj.where)
                    res += " AND ";
                else
                    res += " OR ";
                res += `${obj.column}${obj.compare ? obj.compare : '='}?`;
                params.push(obj.value);
            }
            else if (obj) {
                res = `WHERE ${obj.column}${obj.compare ? obj.compare : '='}?`;
                params.push(obj.value);
            }
            return res;
        }, "");
        var sql = `DELETE FROM ${this._table} ${where}`;
        return {
            sql: sql,
            params: params
        };
    }
}
exports.default = Delete;
