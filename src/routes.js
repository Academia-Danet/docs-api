const { Router } = require("express")
const { authenticationToken, upload } = require("./utils")
const { login, register, logout } = require("./controllers/auth")
const document = require("./controllers/document")
const userController = require("./controllers/userController")

const route = Router()

route
    .get("/users", authenticationToken, userController.get)
    .get("/users/:id", authenticationToken, userController.getById)
    .post("/users", authenticationToken, userController.create)
    .put("/users/:id", authenticationToken, userController.update)
    .delete("/users", authenticationToken, userController.del)

route
    .post("/auth/register", register)
    .post("/auth/login", login)
    .post("/auth/logout", authenticationToken, logout)

route
    .get("/document", authenticationToken, document.get)
    .get("/document/:id", authenticationToken, document.getById)
    .post("/document", upload.single("file"), authenticationToken, document.create)
    .put("/document/:id", upload.single("file"), authenticationToken, document.update)
    .delete("/document", authenticationToken, document.del)

module.exports = route