import Model from "./Model";

export default class Select extends Model{
    public _action: string = ""; // insert || update || select || delete
    public _select: any = "";
    public _join: any = [];
    public _leftJoin: any = [];
    public _rightJoin: any = [];
    public _groupBy: any = [];
    public _having: any = [];
    public _orderBy: any = [];
    public _limit: { begin: number, size: number } = { begin: 0, size: 0 };
    public _where: any = [];

    constructor(table: string){
        super(table);
    }

    public table(table: string){
        this._table = table;

        return this;
    }

    public select(colums: string[]): any {
        this._select = colums.reduce((res: string, val: string): string => {
            if (res && val) return res + ', ' + val;
            else if (val) return val;
            return res;
        }, "")

        this._action = "select";

        return this;
    }

    public join(params: { table: string, on: string }) {
        this._join.push(params);

        return this;
    }

    public leftJoin(params: { table: string, on: string }) {
        this._leftJoin.push(params);

        return this;
    }

    public where(params: { column: string, compare: string, value: string }) {
        this._where.push({ ...params, where: true });

        return this;
    }

    public orWhere(params: { column: string, compare: string, value: string }) {
        this._where.push({ ...params, where: false });

        return this;
    }

    public orderBy(params: string[]) {
        this._orderBy = params;

        return this;
    }

    public groupBy(params: string[]) {
        this._groupBy = params;

        return this;
    }

    public having(params: { colum: string, compare: string, value: string, and: boolean }) {
        this._having.push({ ...params });

        return this;
    }

    public limit(params: { begin: number, size: number }) {
        this._limit = params;

        return this;
    }

    public first(){
        this._limit.begin = 1;
        this._limit.size = 0;

        return this;
    }

    public paginate(params: { page: number, size: number }) {
        this._limit = {
            begin: params.size * (params.page - 1),
            size: params.size
        };
    }

    public toSqlSelect() {
        var select = `SELECT ${this._select ? this._select : '*'} FROM ${this._table}`;

        var join = this._join.reduce((res: any, obj: any) => {
            if (res && obj) res += ` INNER JOIN ${obj.table} ON ${obj.on}`;
            else if (obj) res = `INNER JOIN ${obj.table} ON ${obj.on}`;

            return res;
        }, "");

        var leftJoin = this._leftJoin.reduce((res: any, obj: any) => {
            if (res && obj) res += ` LEFT JOIN ${obj.table} ON ${obj.on}`;
            else if (obj) res = `LEFT JOIN ${obj.table} ON ${obj.on}`;

            return res;
        }, "");

        var rightJoin = this._rightJoin.reduce((res: any, obj: any) => {
            if (res && obj) res += ` RIGHT JOIN ${obj.table} ON ${obj.on}`;
            else if (obj) res = `RIGHT JOIN ${obj.table} ON ${obj.on}`;

            return res;
        }, "");

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

        var orderBy = this._orderBy.reduce((res: any, val: any) => {
            if (res && val) res += `,${val}`;
            else if (val) res = `ORDER BY ${val}`;

            return res;
        }, "");

        var groupBy = this._groupBy.reduce((res: any, val: any) => {
            if (res && val) res += `,${val}`;
            else if (val) res = `GROUP BY ${val}`;

            return res;
        }, "");

        var having = this._having.reduce((res: any, obj: any) => {
            if (res && obj) {
                if (obj.and) res += " AND ";
                else res += " OR ";

                res += `${obj.column}${obj.compare ? obj.compare : '='} ?`;
                params.push(obj.value);
            } else if (obj) {
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
        } else if(this._limit.begin) {
            limit = `LIMIT ?`;

            params.push(this._limit.begin);
        }

        var sql = [select, join, leftJoin, rightJoin , where, groupBy, having, orderBy, limit].reduce((result,value)=>{
            if(result && value) result += " "+value;
            else if(value) result = value;

            return result;
        }, "");

        return {
            sql: sql,
            params: params
        }
    }

    public get(){
        var data = this.toSqlSelect();
        if(data.params.length) this.queryWithParams(data.sql, data.params);
        else this.query(data.sql);
    }
}