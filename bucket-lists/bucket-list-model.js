const db = require("../data/db-config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove,
	addBucketListItem,
	findBucketListItem,
	findBucketListItemById,
	updateBucketListItem,
	removeBucketListItem,
	addPhoto,
	findPhotos,
	findPhotoById,
	updatePhoto,
	removePhoto,
};

///////////////
//bucket list//
///////////////

//Returns all bucket lists
function find() {
	return db("BucketList");
}

//Find and return bucket list based on the serch filter provided
function findBy(filter) {
	return db("BucketList").where(filter);
}

async function add(bucketList) {
	const [id] = await db("BucketList").insert(bucketList);

	return findById(id);
}

function findById(id) {
	return db("BucketList")
		.where({ id })
		.first();
}

async function update(changes, id) {
	await db("BucketList")
		.where({ id })
		.update(changes);

	return findById(id);
}

function remove(id) {
	// returns removed count
	return db("BucketList")
		.where({ id })
		.del();
}
///////////////////////////////

////////////////////
//Bucket List Item//
////////////////////
function findBucketListItem() {
	return db("BucketListItem");
}

async function addBucketListItem(item) {
	const [id] = await db("BucketListItem").insert(item);

	return findBucketListItemById(id);
}

function findBucketListItemById(id) {
	return db("BucketListItem")
		.where({ id })
		.first();
}

async function updateBucketListItem(changes, id) {
	await db("BucketListItem")
		.where({ id })
		.update(changes);

	return findBucketListItemById(id);
}

function removeBucketListItem(id) {
	// returns removed count
	return db("BucketListItem")
		.where({ id })
		.del();
}
/////////////////////////////

//////////
//Photo//
/////////

// Returns all photos
function findPhotos() {
	return db("Photos");
}

async function addPhoto(photo) {
	const [id] = await db("Photos").insert(photo);

	return findPhotoById(id);
}

function findPhotoById(id) {
	return db("Photos")
		.where({ id })
		.first();
}

async function updatePhoto(changes, id) {
	await db("Photos")
		.where({ id })
		.update(changes);

	return findPhotoById(id);
}

function removePhoto(id) {
	// returns removed count
	return db("Photos")
		.where({ id })
		.del();
}
/////////////////////////////
