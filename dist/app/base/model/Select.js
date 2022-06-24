"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
class Select extends Model_1.default {
    constructor(table) {
        super(table);
        this._action = ""; // insert || update || select || delete
        this._select = "";
        this._join = [];
        this._leftJoin = [];
        this._rightJoin = [];
        this._groupBy = [];
        this._having = [];
        this._orderBy = [];
        this._limit = { begin: 0, size: 0 };
        this._where = [];
    }
    table(table) {
        this._table = table;
        return this;
    }
    select(colums) {
        this._select = colums.reduce((res, val) => {
            if (res && val)
                return res + ', ' + val;
            else if (val)
                return val;
            return res;
        }, "");
        this._action = "select";
        return this;
    }
    join(params) {
        this._join.push(params);
        return this;
    }
    leftJoin(params) {
        this._leftJoin.push(params);
        return this;
    }
    where(params) {
        this._where.push({ ...params, where: true });
        return this;
    }
    orWhere(params) {
        this._where.push({ ...params, where: false });
        return this;
    }
    orderBy(params) {
        this._orderBy = params;
        return this;
    }
    groupBy(params) {
        this._groupBy = params;
        return this;
    }
    having(params) {
        this._having.push({ ...params });
        return this;
    }
    limit(params) {
        this._limit = params;
        return this;
    }
    first() {
        this._limit.begin = 1;
        this._limit.size = 0;
        return this;
    }
    paginate(params) {
        this._limit = {
            begin: params.size * (params.page - 1),
            size: params.size
        };
    }
    toSqlSelect() {
        var select = `SELECT ${this._select ? this._select : '*'} FROM ${this._table}`;
        var join = this._join.reduce((res, obj) => {
            if (res && obj)
                res += ` INNER JOIN ${obj.table} ON ${obj.on}`;
            else if (obj)
                res = `INNER JOIN ${obj.table} ON ${obj.on}`;
            return res;
        }, "");
        var leftJoin = this._leftJoin.reduce((res, obj) => {
            if (res && obj)
                res += ` LEFT JOIN ${obj.table} ON ${obj.on}`;
            else if (obj)
                res = `LEFT JOIN ${obj.table} ON ${obj.on}`;
            return res;
        }, "");
        var rightJoin = this._rightJoin.reduce((res, obj) => {
            if (res && obj)
                res += ` RIGHT JOIN ${obj.table} ON ${obj.on}`;
            else if (obj)
                res = `RIGHT JOIN ${obj.table} ON ${obj.on}`;
            return res;
        }, "");
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
        var orderBy = this._orderBy.reduce((res, val) => {
            if (res && val)
                res += `,${val}`;
            else if (val)
                res = `ORDER BY ${val}`;
            return res;
        }, "");
        var groupBy = this._groupBy.reduce((res, val) => {
            if (res && val)
                res += `,${val}`;
            else if (val)
                res = `GROUP BY ${val}`;
            return res;
        }, "");
        var having = this._having.reduce((res, obj) => {
            if (res && obj) {
                if (obj.and)
                    res += " AND ";
                else
                    res += " OR ";
                res += `${obj.column}${obj.compare ? obj.compare : '='} ?`;
                params.push(obj.value);
            }
            else if (obj) {
                res = `HAVING ${obj.column}${obj.compare ? obj.compare : '='} ?`;
                params.push(obj.value);
            }
            return res;
        }, "");
        var limit = "";
        if (this._limit.begin && this._limit.size) {
            limit = `LIMIT ?,?`;
            params.push(this._limit.begin);
            params.push(this._limit.size);
        }
        else if (this._limit.begin) {
            limit = `LIMIT ?`;
            params.push(this._limit.begin);
        }
        var sql = [select, join, leftJoin, rightJoin, where, groupBy, having, orderBy, limit].reduce((result, value) => {
            if (result && value)
                result += " " + value;
            else if (value)
                result = value;
            return result;
        }, "");
        return {
            sql: sql,
            params: params
        };
    }
    get() {
        var data = this.toSqlSelect();
        if (data.params.length)
            this.queryWithParams(data.sql, data.params);
        else
            this.query(data.sql);
    }
}
exports.default = Select;
