"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Insert_1 = __importDefault(require("./Insert"));
class Update extends Insert_1.default {
    constructor(table) {
        super(table);
    }
    update(params) {
        this._action = "update";
        this._update = params;
        return this;
    }
    toSqlUpdate() {
        var params = this._update;
        var paramsQuery = [];
        var sql = `UPDATE ${this._table} SET ?`;
        paramsQuery.push(params);
        var where = this._where.reduce((res, obj) => {
            if (res && obj) {
                if (obj.where)
                    res += " AND ";
                else
                    res += " OR ";
                res += `${obj.column}${obj.compare ? obj.compare : '='}?`;
                paramsQuery.push(obj.value);
            }
            else if (obj) {
                res = `WHERE ${obj.column}${obj.compare ? obj.compare : '='}?`;
                paramsQuery.push(obj.value);
            }
            return res;
        }, "");
        sql += " " + where;
        return {
            sql: sql,
            params: paramsQuery
        };
    }
}
exports.default = Update;
