var route   = require("express").Router();

route.get("/", (request: any, response: any)=>{
    console.log(this);
    return response.json({
        message: "welcome"
    })
});

route.use("/v1", require("./v1/routes"));

export = route;