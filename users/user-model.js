const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findBy,
  findById,
  addSharedWithUser,
  findSharedWithUsers,
  findSharedWithUserById
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

//////////////////////
//Shared With Users//
/////////////////////

async function addSharedWithUser(user) {
  console.log(user)
	const [id] = await db("SharedWithUsers").insert(user);

	return findSharedWithUserById(id);
}

function findSharedWithUsers() {
	return db("SharedWithUsers");
}

function findSharedWithUserById(id) {
  return db('SharedWithUsers')
    .where({ id })
}
