import {Request, Response} from "express";
import Controller from "../../base/Controller";
import UserModel from "../models/UserModel";

export class UserController extends Controller{
    constructor(){
        var model: any = new UserModel();
        super(model);
    }

    index(request: Request, response: Response){
        this.model
        .select(["*"])
        //.where({column: "username", value: "admin"})
        //.first()
        .run()
        .then((results: any)=>{
            response.json(
               results
            );
        })
        .catch((error: any)=>{
            
        })
       
    }
}