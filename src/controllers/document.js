const knex = require("../database/db.config");
const { v4: uuidv4 } = require('uuid');

const get = async (req, res) => {
    try{
        const documents = await knex("documents").select()
        if(documents.length === 0) return res.status(404).json("No documents found!")

        return res.status(200).json(documents)
    }catch(err){
        return res.status(500).json("internal server error")
    }
}

const getById = async (req, res) => {
    const id = req.params.id
    try{
        const documents = await knex("documents").select().where({id})
        if(documents.length === 0) return res.status(404).json("document found!")

        return res.status(200).json(documents)
    }catch(err){
        return res.status(500).json("internal server error")
    }
}

const create = async (req, res) => {
    const {identifier, type} = req.body
    const file = req.file
    const picture = file.filename

    try{
        const documents = await knex("documents").insert({"id": uuidv4(), identifier, type, picture})
        if(documents.rowCount === 0) return res.status(400).json("error to save document, please try again!")

        return res.status(200).json("document has been created!")
    }catch(err){
        return res.status(500).json("internal server error")
    }
}

const update = async (req, res) => {
    const {id} = req.body
    try{
        const documents = await knex("documents").where({id}).update({...data, update_at: new Date()})
        if(documents.rowCount === 0) return res.status(400).json("error to update document, please try again!")

        return res.status(200).json("document has been updated!")
    }catch(err){
        return res.status(500).json("internal server error")
    }
}
const del = async (req, res) => {
    const id = req.params.id
    try{
        const documents = await knex("documents").where({id}).del()
        if(documents.rowCount === 0) return res.status(400).json("error to delete document, check the id and try again!")

        return res.status(200).json("document has been deleted!")
    }catch(err){
        return res.status(500).json("internal server error")
    }
}

module.exports = { get, create, getById, update, del }