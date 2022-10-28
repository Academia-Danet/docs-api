const knex = require("../database/db.config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid")

const register = async (req, res) => {
    const { name, surname, email, password } = req.body

    try {
        const emailAlreadyExiste = await knex.select("email").from("users").where("email", email)
        if (emailAlreadyExiste.length > 0) return res.status(409).json("user email already existe!")

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const save = await knex("users").insert({ "id": uuidv4(), name, surname, email, "password": hash })
        if (save.rowCount === 0) return res.status(400).json("error to save user, please try again!")

        return res.status(201).json("user has been created");
    } catch (err) {
        return res.sendStatus(500)
    }
}

const login = async (req, res) => {
    try{
        const user = await knex("users").select().where("email", req.body.email)
        if(user.length === 0) return res.status(404).json("user not found!")

        const passwordMatch = bcrypt.compareSync(req.body.password, user[0].password)
        if(!passwordMatch) return res.status(400).json("wrong username or password!")

        const accessToken = jwt.sign({id: user[0].id}, process.env.ACCESS_TOKEN_SECRETE, {expiresIn: "24h"})
        const {password, ...data} = user[0]

        return res.json({"access_token": accessToken, data})
    }catch(err){
        return res.sendStatus(500)
    }
}

const logout = async (req, res) => {
    const authHeader = req.headers["authorization"]

    jwt.sign(authHeader, process.env.ACCESS_TOKEN_SECRETE, {expiresIn: 1}, (logout,err) => {
        if(logout) return res.status(200).json("user has been logged out!")
    })
}

module.exports = { register, login, logout }