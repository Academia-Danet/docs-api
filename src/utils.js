const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")

function authenticationToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = { authenticationToken, upload }
