const taskRouter = require("./task.route");
const userRouter = require("./user.route");
const authMiddlewares = require("../middlewares/auth.middlewares")
module.exports = (app)=>{
    
    const version = "/api/v1"
    app.use(`${version}/tasks`,authMiddlewares.requireAuth, taskRouter)
    app.use(`${version}/users`,userRouter)


}