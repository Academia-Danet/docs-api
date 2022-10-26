const app = require("./src/app")
const http = require("http")
const port = 8000

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`Server is running at ${port} port...`)
})