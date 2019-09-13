const db = require("../data/db-config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	addSharedWithUser,
	findSharedWithUsers,
	findSharedWithUserById,
	findSharedUsersByProjectId,
};

function find() {
	return db("Users").select("id", "username");
}

function findBy(filter) {
	return db("Users").where(filter);
}

async function add(user) {
	const [id] = await db("Users").insert(user);

	return findById(id);
}

function findById(id) {
	return db("Users")
		.where({ id })
		.first();
}

//////////////////////
//Shared With Users//
/////////////////////

//TODO check this out
async function addSharedWithUser(user) {
	const entries = await db("SharedWithUsers").insert(user);
	const id = user.user_id;
	return findSharedWithUserById(id);
}

function findSharedWithUsers() {
	return db("SharedWithUsers").where();
}

function findSharedWithUserById(user_id) {
	return db("SharedWithUsers").where({ user_id });
}

function findSharedUsersByProjectId(id) {
	return db("SharedWithUsers as swu")
		.join("Users as u", "u.id", "swu.user_id")
		.select("u.id")
		.where("swu.bucketList_id", id)
		.groupBy("u.id");
}
