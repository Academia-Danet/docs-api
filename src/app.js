const express = require("express")
const routes = require("./routes")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.json({message: "DOCS API"})
})

app.use("/api/v1/", routes)

app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({error: error.message})
})

module.exports = app