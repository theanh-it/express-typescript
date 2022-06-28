import Delete from "./Delete";

export default class Index extends Delete{
    constructor(table: string){
        super(table);
    }

    public clear(){
        this._action = "";
        this._select = "";
        this._join = [];
        this._leftJoin = [];
        this._rightJoin = [];
        this._groupBy = [];
        this._having = [];
        this._orderBy = [];
        this._limit = { begin: 0, size: 0 };
        this._where = [];
        this._whereRaw = [];
        this._whereIn = [];
        this._whereNotIn = [];
        this._search = false;
        this._update = "";
        this._insert = "";
    }

    public toSql(){
        if(this._action == "insert") return this.toSqlInsert();
        else if(this._action == "update") return this.toSqlUpdate();
        else if(this._action == "select") return this.toSqlSelect();
        else if(this._action == "delete") return this.toSqlDelete();
    }

    public run(){
        var data: any = this.toSql();

        this.clear();

        if(data.params.length) return this.queryWithParams(data.sql, data.params);
        else return this.query(data.sql);
    }

    public getAll(){
        return this.select("*")
        .run();
    }

    public getSingle(id: number){
        return this.select("*")
        .where("id", id)
        .run();
    }
}