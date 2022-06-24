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
        var where = this._where.reduce((res: any, obj: any) => {
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
        }, "");

        var sql: string = `DELETE FROM ${this._table} ${where}`;

        return {
            sql: sql,
            params: params
        }
    }
}