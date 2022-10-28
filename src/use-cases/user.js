const knex = require("../database/db.config");

async function getUser() {
  return await knex("users").select();
}
async function getUserByID(id) {
  return await knex("users").select().where({id});
}
async function createUser(data) {
  return await knex("users").create(data);
}
async function updateUser(id, data) {
  return await knex("users").where({id}).update({...data, updated_at: new Date()});
}
async function deleteUser(id) {
  return await knex("users").where({id}).del();
}

module.exports = { getUser, createUser, getUserByID, updateUser, deleteUser };
