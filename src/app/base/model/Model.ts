 class Model{
    public _table: any = "";

    constructor(table: string){
        this._table = table;
    }

    public query(sql: string): any {
        return new Promise((resolve, reject)=>{
            globalThis.DB.query(sql, (error: any, results: any)=>{
                if (error) reject(error);
                return resolve(results);
            });
        });
    }

    public queryWithParams(sql: string, params: any[]): any {
        return new Promise((resolve, reject)=>{
            globalThis.DB.query(sql, params,(error: any, results: any)=>{
                if (error) reject(error);
                return resolve(results);
            });
        });
    }
}

export default Model;