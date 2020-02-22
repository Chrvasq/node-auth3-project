const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByDepartment
};

function find() {
  return db("users").select("id", "username", "department");
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .select("id", "username", "department")
    .where({ id })
    .first();
}

function findByDepartment(department) {
  return db("users")
    .where(department)
    .select("id", "username", "department");
}
