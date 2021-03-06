const db = require("../data/db-config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove,
	addBucketListItem,
	findBucketListItems,
	findBucketListItemById,
	updateBucketListItem,
	removeBucketListItem,
	addPhoto,
	findPhotos,
	findPhotoById,
	updatePhoto,
	removePhoto,
	addEntry,
	findEntries,
	findEntryById,
	updateEntry,
	removeEntry,
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

function add(bucketList) {
	const [id] = db("BucketList").insert(bucketList)
	.then(response => {
		console.log(response)
	})


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
function findBucketListItems() {
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

///////////////////
//Journal entries//
///////////////////

function findEntries() {
	return db("JournalEntries");
}

async function addEntry(entry) {
	console.log(entry)
	const [id] = await db("JournalEntries").insert(entry);

	return findEntryById(id);
}

function findEntryById(id) {
	return db("JournalEntries")
		.where({ id })
		.first();
}

async function updateEntry(changes, id) {
	await db("JournalEntries")
		.where({ id })
		.update(changes);

	return findEntryById(id);
}

function removeEntry(id) {
	// returns removed count
	return db("JournalEntries")
		.where({ id })
		.del();
}