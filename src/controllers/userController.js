const {getUser, createUser, getUserByID, updateUser, deleteUser } = require("../use-cases/user")

const get = async (req, res)=>{
    const users = await getUser()
    return res.status(200).json(users)
}
const getById = async (req, res)=>{
    const user = await getUserByID(req.params.id)
    return res.status(200).json(user)
}
const create = async (req, res)=>{
    const { name, surname, email, password } = req.body
    const data = {name, surname, email, password}
    const users = await createUser(data)
    return res.status(200).json(users)
}
const update = async (req, res)=>{
    await updateUser(req.params.id)
    return res.status.json({message: "usuario alterado com sucesso!"})
}
const del = async (req, res)=>{
    await deleteUser(req.params.id)
    return res.status.json({message: "usuario deletado com sucesso!"})
}

module.exports = {get, create, getById, update, del}