const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('Users').select('id', 'username');
}

function findBy(filter) {
  return db('Users').where(filter);
}

async function add(user) {
  const [id] = await db('Users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('Users')
    .where({ id })
    .first();
}
