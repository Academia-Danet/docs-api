const express = require("express")
const userController = require("./controllers/userController")
const documents = require("./controllers/document")
const auth = require("./controllers/auth")
const jwt = require("jsonwebtoken")
const { upload } = require("./utils")

const route = express.Router()

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })
}

route
    .get("/users", authenticateToken, userController.get)
    .get("/users/:id", authenticateToken, userController.getById)
    .post("/users", authenticateToken, userController.create)
    .put("/users", authenticateToken, userController.update)
    .delete("/users/:id", authenticateToken, userController.del)

route
    .post("/auth/login", auth.login)
    .post("/auth/register", auth.register)
    .post("/auth/logout", authenticateToken, auth.logout)

route
    .get("/document", authenticateToken, documents.get)
    .get("/document/:id", authenticateToken, documents.getById)
    .post("/document", upload.single("file"), authenticateToken, documents.create)
    .put("/document", authenticateToken, documents.update)
    .delete("/document/:id", authenticateToken, documents.del)

module.exports = route