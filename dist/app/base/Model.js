"use strict";
class Model {
    constructor(table) {
        this.table = table;
    }
    query(sql) {
        return new Promise((resolve, reject) => {
            globalThis.DB.query(sql, (error, results) => {
                if (error)
                    reject(error);
                return resolve(results);
            });
        });
    }
    queryWithParams(sql, params) {
        return new Promise((resolve, reject) => {
            globalThis.DB.query(sql, params, (error, results) => {
                if (error)
                    reject(error);
                return resolve(results);
            });
        });
    }
}
module.exports = Model;
