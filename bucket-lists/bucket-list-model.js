const db = require('../data/db-config');

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
    addPhotos,
    findPhotos,
    findPhotoById,
    updatePhoto,
    removePhoto
}

///////////////
//bucket list//
///////////////

function find() {
    return db('BucketList')
}
  
function findBy(filter) {
    return db('BucketList').where(filter);
}
  
async function add(bucketList) {
    const [id] = await db('BucketList').insert(bucketList);

return findById(id);
}
  
function findById(id) {
    return db('BucketList')
        .where({ id })
        .first();
}

async function update(changes, id) {
    await db('BucketList')
        .where({ id })
        .update(changes);

    return findById(id);
}

function remove(id) {
    // returns removed count
    return db('BucketList')
      .where({ id })
      .del();
}
///////////////////////////////

////////////////////
//Bucket List Item//
////////////////////
function findBucketListItem() {
    return db('BucketListItem')
}
  
async function addBucketListItem(item) {
    const [id] = await db('BucketListItem').insert(item);

return findById(id);
}
  
function findBucketListItemById(id) {
    return db('BucketListItem')
        .where({ id })
        .first();
}

async function updateBucketListItem(changes, id) {
    await db('BucketListItem')
        .where({ id })
        .update(changes);

    return findById(id);
}

function removeBucketListItem(id) {
    // returns removed count
    return db('BucketListItem')
      .where({ id })
      .del();
}
/////////////////////////////


//////////
//Photo//
/////////

function findPhotos() {
    return db('Photos')
}
  
  
async function addPhotos(photo) {
    const [id] = await db('Photos').insert(photo);

return findById(id);
}
  
function findPhotoById(id) {
    return db('Photos')
        .where({ id })
        .first();
}

async function updatePhoto(changes, id) {
    await db('Photos')
        .where({ id })
        .update(changes);

    return findById(id);
}

function removePhoto(id) {
    // returns removed count
    return db('Photos')
      .where({ id })
      .del();
}
/////////////////////////////

