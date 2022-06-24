import {Request, Response} from "express";

export default class Controller{
    protected model: any;

    constructor(model: any){
        this.model  = model;
        this.index  = this.index.bind(this);
        this.show   = this.show.bind(this);
    }

    public index(request: Request, response: Response): any {
        this.model.getAll().then((results: any): any => {
            response.json({
                message: "success",
                result: results
            });
        })
        .catch((error: any): any => {
            response.json({
                message: "error",
                result: error
            });
        });
    }

    public show(request: Request, response: Response){
        this.model.getSingle(request.params.id).then((results: any): any => {
            response.json({
                message: "success",
                result: results.length ? results[0] : {}
            })
        })
        .catch((error: any) : any => {
            response.json({
                message: "error",
                result: error
            });
        });
    }
}