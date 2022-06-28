import { Request, Response } from "express";
import Controller from "../../base/Controller";
import UserModel from "../models/UserModel";

export default class UserController extends Controller {
    constructor() {
        var model: any = new UserModel();
        super(model);
        this.create = this.create.bind(this);
    }

    public index(request: Request, response: Response) {
        this.model
            .select(["*"])
            .searchFullText({column: "fullname", value: "th"})
            .where({column: "id", compare: "<",value: 100})
            .orWhereRaw("id = ?", [1])
            .run()
            .then((results: any) => {
                response.json(
                    results
                );
            })
            .catch((error: any) => {
                response.json(
                    error
                );
            })

    }

    public create(request: Request, response: Response) {

        this.model
            .transaction()
            .select(["*"])
            .run()
            .then((results: any) => {
                return this.model.update({ username: "admin", fullname: "theanh" }).where({ column: "username", value: "admin" }).run();
            })
            .then((results: any) => {
                return this.model.insert({uuid:"123-123-123-123", email: "theanhit.com@gmail.com", username: "theanh", password: "123123" }).run();
            })
            .then(() => {
                this.model.commit();

                response.json({
                    message: "success",
                    result: this.model.select(["*"]).run()
                });
            })
            .catch(async (error: any) => {
                this.model.rollback();
                response.json({
                    message: "error",
                    result: error
                });
            });
    }
}