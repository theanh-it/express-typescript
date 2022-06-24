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

        var where = this._where.reduce((res: any, obj: any) => {
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
        }, "");

        sql += " " + where;
        return {
            sql: sql,
            params: paramsQuery
        }
    }
}