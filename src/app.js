const express = require("express")
const routes = require("./routes")
const app = express()

app.use(express.json())

app.get("/", (req, res)=>{
    res.json({message: "DOCS API"})
})

app.use(routes)

module.exports = app