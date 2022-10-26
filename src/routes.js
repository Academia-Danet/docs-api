const { Router } = require("express")
const userController = require("./controllers/userController")
const route = Router()

route.get("/users", userController.get)
route.get("/users/:id", userController.getById)
route.post("/users", userController.create)
route.put("/users", userController.update)
route.delete("/users", userController.del)

module.exports = route