const knex = require("../database/db.config")
const { v4: uuidv4 } = require("uuid")

const get = async (req, res) => {
    try {
        const document = await knex("documents").select()
        if(document.length === 0) return res.status(400).json("No document found!")

        return res.status(200).json(document)
    } catch (err) {
        return res.sendStatus(500)
    }
}

const getById = async (req, res) => {
    const id = req.params.id
    try {
        const document = await knex("documents").select().where({id})
        if(document.length === 0) return res.status(400).json("document not found!")

        return res.status(200).json(document)
    } catch (err) {
        return res.sendStatus(500)
    }
}

const create = async (req, res) => {
    const {identifier, type} = req.body
    const file = req.file
    const picture = file.filename

    try {
        const document = await knex("documents").insert({"id": uuidv4(), identifier, type, picture})
        if(document.rowCount === 0) return res.status(400).json("error to save document, please try again!")
    
        return res.status(200).json("document has been saved!")
    } catch (err) {
        return res.sendStatus(500)
    }
}

const update = async (req, res) => {
    const id = req.params.id
    const {identifier, type} = req.body
    const file = req.file
    const picture = file.filename

    const dataToUpdate = {identifier, type, picture}

    try {
        const document = await knex("documents").where({id}).update({...dataToUpdate, updated_at: new Date()}); 
        if(document.rowCount === 0) return res.status(400).json("error to update document, please try again!")
    
        return res.status(200).json("document has been updated!")
    } catch (err) {
        console.log(err.message);
        return res.sendStatus(500)
    }
}

const del = async (req, res) => {
    const id = req.params.id
    try {
        const document = await knex("documents").where({id}).del()
        if(document.rowCount === 0) return res.status(400).json("error to delete document, please check the user id an try again!")

        return res.status(200).json("document has been deleted")
    } catch (err) {
        return res.sendStatus(500)
    }
}

module.exports = { get, create, getById, update, del }