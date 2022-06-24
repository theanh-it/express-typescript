import Select from "./Select";

export default class Insert extends Select {
    public _insert: any;

    constructor(table: string){
        super(table);
    }

    public insert(params: any) {
        this._action = "insert";
        this._insert = params;
        
        return this;
    }

    public toSqlInsert(){
        var params: any         = this._insert;
        var sql: string         = ``;
        var paramsQuery: any    = [];

        if (Array.isArray(params) && params.length) {
            var set: string = ``;

            for (var key in params[0]) {
                if (set) {
                    set += `,${key}`;
                } else {
                    set = `${this._table}(${key}`;
                }
            }

            set += `)`;

            var values: any = [];

            for (var param of params) {
                var value: string = ``;

                for (var key in param) {
                    if (value) {
                        value += `,?`
                        paramsQuery.push(param[key]);
                    } else {
                        value = `(?`;
                        paramsQuery.push(param[key]);
                    }
                }

                value += `)`;

                values.push(value);
            }

            values = values.reduce((res: string, val: string) => {
                if(res && val) res += "," + val;
                else if(val) res = val;
                
                return res;
            }, "")

            sql = `INSERT INTO ${set} VALUES ${values}`;
        } else if (typeof params == "object") {
            sql = `INSERT INTO ${this.table} SET ?`;
            paramsQuery.push(params);
        }
        
        return {
            sql : sql,
            params: paramsQuery
        }
    }
}