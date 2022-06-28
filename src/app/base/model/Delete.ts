import Update from "./Update";

export default class Delete extends Update{
    constructor(table: string){
        super(table);
    }

    public delete(){
        this._action = "delete";

        return this;
    }

    public toSqlDelete(){
        var params: any = [];
        var where: string = "";

        if (this._search) {
            where = `WHERE MATCH(${this._search.column}) AGAINST(? IN BOOLEAN MODE)`;
            params.push(this._search.value ? this._search.value + "*" : "");
        }

        if (this._whereRaw.length) {
            where = this._whereRaw.reduce((res: any, obj: any) => {
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

        if (this._whereIn.length) {
            where = this._whereIn.reduce((res: any, obj: any) => {
                if (res && obj) {
                    if (obj.isAnd) res += " AND ";
                    else res += " OR ";

                    var _in = obj.params.reduce((r: any,v: any)=>{
                        if(r&&v) r += `,?`;
                        else if(v) r = `?`;
                        return r;
                    }, "");

                    res += `${obj.column} IN (${_in})`;
                    params = params.concat(obj.params);
                } else if (obj && obj.params.length) {
                    var _in = obj.params.reduce((r: any,v: any)=>{
                        if(r&&v) r += `,?`;
                        else if(v) r = `?`;
                        return r;
                    }, "");

                    res = `WHERE ${obj.column} IN (${_in})`;
                    params = obj.params;
                }
                return res;
            }, where);
        }

        if (this._whereNotIn.length) {
            where = this._whereNotIn.reduce((res: any, obj: any) => {
                if (res && obj) {
                    if (obj.isAnd) res += " AND ";
                    else res += " OR ";

                    var _in = obj.params.reduce((r: any,v: any)=>{
                        if(r&&v) r += `,?`;
                        else if(v) r = `?`;
                        return r;
                    }, "");

                    res += `${obj.column} NOT IN (${_in})`;
                    params = params.concat(obj.params);
                } else if (obj && obj.params.length) {
                    var _in = obj.params.reduce((r: any,v: any)=>{
                        if(r&&v) r += `,?`;
                        else if(v) r = `?`;
                        return r;
                    }, "");

                    res = `WHERE ${obj.column} NOT IN (${_in})`;
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
                params.push(obj.value);
            } else if (obj) {
                res = `WHERE ${obj.column}${obj.compare ? obj.compare : '='}?`;
                params.push(obj.value);
            }
            return res;
        }, where);

        var sql: string = `DELETE FROM ${this._table} ${where}`;

        return {
            sql: sql,
            params: params
        }
    }
}