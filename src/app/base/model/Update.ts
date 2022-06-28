import Insert from "./Insert";

export default class Update extends Insert {
    public _update: any;

    constructor(table: string){
        super(table);
    }

    public update(params: any) {
        this._action = "update";
        this._update = params;

        return this;
    }

    public toSqlUpdate(){
        var params: any = this._update;
        var paramsQuery: any = [];
        var sql: string = `UPDATE ${this._table} SET ?`;

        paramsQuery.push(params);

        var where: string = "";

        if (this._search) {
            where = `WHERE MATCH(${this._search.column}) AGAINST(? IN BOOLEAN MODE)`;
            paramsQuery.push(this._search.value ? this._search.value + "*" : "");
        }

        if (this._whereRaw.length) {
            where = this._whereRaw.reduce((res: any, obj: any) => {
                if (res && obj) {
                    if (obj.isAnd) res += " AND ";
                    else res += " OR ";

                    res += obj.where;
                    paramsQuery = paramsQuery.concat(obj.params);
                } else if (obj) {
                    res = `WHERE ` + obj.where;
                    paramsQuery = obj.params;
                }
                return res;
            }, where);
        }

        if (this._whereIn.length) {
            where = this._whereIn.reduce((res: any, obj: any) => {
                if (res && obj) {
                    if (obj.isAnd) res += " AND ";
                    else res += " OR ";

                    res += obj.where;
                    paramsQuery = paramsQuery.concat(obj.params);
                } else if (obj) {
                    res = `WHERE ` + obj.where;
                    paramsQuery = obj.params;
                }
                return res;
            }, where);
        }

        if (this._whereNotIn.length) {
            where = this._whereNotIn.reduce((res: any, obj: any) => {
                if (res && obj) {
                    if (obj.isAnd) res += " AND ";
                    else res += " OR ";

                    res += obj.where;
                    params = params.concat(obj.params);
                } else if (obj) {
                    res = `WHERE ` + obj.where;
                    params = obj.params;
                }
                return res;
            }, where);
        }

        where = this._where.reduce((res: any, obj: any) => {
            if (res && obj) {
                if (obj.where) res += " AND ";
                else res += " OR ";

                res += `${obj.column}${obj.compare ? obj.compare : '='}?`;
                paramsQuery.push(obj.value);
            } else if (obj) {
                res = `WHERE ${obj.column}${obj.compare ? obj.compare : '='}?`;
                paramsQuery.push(obj.value);
            }
            return res;
        }, where);

        sql += " " + where;
        return {
            sql: sql,
            params: paramsQuery
        }
    }
}