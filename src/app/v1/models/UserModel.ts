import Model from "../../base/model/Index";

export default class UserModel extends Model{
    constructor(){
        super("users");
    }

    async getAll(){
        return await this.query(`SELECT * FROM ${this._table}`);
    }

    async getSingle(id: number){
        return await this.queryWithParams(`SELECT * FROM ${this._table} WHERE id=?`, [id])
    }
}