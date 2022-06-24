var route   = require("express").Router();

route.get("", (request: any, response: any)=>{
    return response.json({
        message: "welcome v1"
    })
});

route.use("/user", require("./user"));

export = route;