"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Select_1 = __importDefault(require("./Select"));
class Insert extends Select_1.default {
    constructor(table) {
        super(table);
    }
    insert(params) {
        this._action = "insert";
        this._insert = params;
        return this;
    }
    toSqlInsert() {
        var params = this._insert;
        var sql = ``;
        var paramsQuery = [];
        if (Array.isArray(params) && params.length) {
            var set = ``;
            for (var key in params[0]) {
                if (set) {
                    set += `,${key}`;
                }
                else {
                    set = `${this._table}(${key}`;
                }
            }
            set += `)`;
            var values = [];
            for (var param of params) {
                var value = ``;
                for (var key in param) {
                    if (value) {
                        value += `,?`;
                        paramsQuery.push(param[key]);
                    }
                    else {
                        value = `(?`;
                        paramsQuery.push(param[key]);
                    }
                }
                value += `)`;
                values.push(value);
            }
            values = values.reduce((res, val) => {
                if (res && val)
                    res += "," + val;
                else if (val)
                    res = val;
                return res;
            }, "");
            sql = `INSERT INTO ${set} VALUES ${values}`;
        }
        else if (typeof params == "object") {
            sql = `INSERT INTO ${this.table} SET ?`;
            paramsQuery.push(params);
        }
        return {
            sql: sql,
            params: paramsQuery
        };
    }
}
exports.default = Insert;
