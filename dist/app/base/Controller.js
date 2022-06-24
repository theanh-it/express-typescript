"use strict";
class Controller {
    constructor(model) {
        this.model = model;
        this.index = this.index.bind(this);
        this.show = this.show.bind(this);
    }
    index(request, response) {
        this.model.getAll().then((results) => {
            response.json({
                message: "success",
                result: results
            });
        })
            .catch((error) => {
            response.json({
                message: "error",
                result: error
            });
        });
    }
    show(request, response) {
        this.model.getSingle(request.params.id).then((results) => {
            response.json({
                message: "success",
                result: results.length ? results[0] : {}
            });
        })
            .catch((error) => {
            response.json({
                message: "error",
                result: error
            });
        });
    }
}
module.exports = Controller;
