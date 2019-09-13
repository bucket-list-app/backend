const router = require("express").Router();

const BucketLists = require("./bucket-list-model");

//Gets all bucket lists
router.get("/", async (req, res) => {
	try {
		const bucketLists = await BucketLists.find();
		res.json(bucketLists);
	} catch (err) {
		res.status(500).json({ message: "Failed to get Bucket Lists" });
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const bucketLists = await BucketLists.findById(id);
		res.json(bucketLists);
	} catch (err) {
		res.status(500).json({ message: "Failed to get Bucket Lists" });
	}
});

//adds a bucket list
router.post("/", async (req, res) => {
	const bucketListData = req.body;
	try {
		const bucketList = await BucketLists.add(bucketListData);
		res.status(201).json(bucketList);
	} catch (err) {
		res.status(500).json({ message: "Failed to add Bucket List" });
	}
});

//Updates bucket list
router.put("/:id", async (req, res) => {
	const id = req.params.id;
	const updatedlist = req.body;
	if (!updatedlist) {
		res.status(400).json({
			message:
				"Please provide the updated item in the body of the request and try again",
		});
	}

	try {
		const updated = await BucketLists.update(updatedlist, id);
		res.status(201).json(updated);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

//Removes a bucketlist
router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const deleted = await BucketLists.remove(id);
		res.status(201).json(deleted);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

//Returns all bucket list items
router.get("/item", async (req, res) => {
	try {
		const bucketListItems = await BucketLists.findBucketListItem();
		res.json(bucketListItems);
	} catch (err) {
		res.status(500).json({ message: "Failed to get Bucket List Item" });
	}
});

//Adds a bucket list item to a bucket list
router.post("/item", async (req, res) => {
	const bucketListItemData = req.body;
	try {
		const bucketListItem = await BucketLists.addBucketListItem(
			bucketListItemData
		);
		res.status(201).json(bucketListItem);
	} catch (err) {
		res.status(500).json({ message: "Failed to add Bucket List Item" });
	}
});

// Updates a bucket list item
//TODO set the valie of "id" on the changed object to the /:id param before sending the updated object to the db
router.put("/item/:id", async (req, res) => {
	const id = req.params.id;
	const updatedItem = req.body;
	if (!updatedItem) {
		res.status(400).json({
			message:
				"Please provide the updated item in the body of the request and try again",
		});
	}

	try {
		const updated = await BucketLists.updateBucketListItem(updatedItem, id);
		res.status(201).json(updated);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

//Removes a bucket list item
router.delete("/item/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const deleted = await BucketLists.removeBucketListItem(id);
		res.status(201).json(deleted);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

// Pictures

// Returns all Photos
router.get("/pictures", async (req, res) => {
	try {
		const photos = await BucketLists.findPhotos();
		res.status(201).json(photos);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

// Adds a photo to db //
//This method will insert the time stamp for us. Just need to pass in the path and the item id it belongs to
router.post("/pictures", async (req, res) => {
	const photo = req.body;
	if (!photo) {
		res.status(401).json({
			message:
				"please provide a path to the photo in the body of the request as photo: ",
		});
	}
	photo.time_stamp = Date.now();
	try {
		const added = await BucketLists.addPhoto(photo);
		res.status(201).json(added);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

// Updates a photo //
//Again, all we need here is the path and item_id
router.put("/pictures/:id", async (req, res) => {
	const id = req.params.id;
	const newPhoto = req.body;
	newPhoto.id = id;

	if (!newPhoto) {
		res.status(422).json({
			message:
				"please provide a new photo to update with in the body of this request as {path: newPhotoPath}",
		});
	}

	try {
		const updated = await BucketLists.updatePhoto(newPhoto, id);
		res.status(201).json(updated);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

// Removes the photo with /:id
router.delete("/pictures/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const removed = await BucketLists.removePhoto(id);
		res.status(201).json(removed);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

//////////////////////
// Journal Entries //
/////////////////////

//Returns all journal entries
router.get("/entry", async (req, res) => {
	try {
		const journalEntries = await BucketLists.findEntries();
		res.json(journalEntries);
	} catch (err) {
		res.status(500).json({ message: "Failed to get Journal Entries" });
	}
});

//Adds a journal entry
router.post("/entry", async (req, res) => {
	const journalEntryData = req.body;
	journalEntryData.time_stamp = Date.now();
	try {
		const journalEntry = await BucketLists.addEntry(journalEntryData);
		res.status(201).json(journalEntry);
	} catch (err) {
		res.status(500).json({ message: "Failed to add Journal Entry" });
	}
});

// Updates a bucket list item
router.put("/entry/:id", async (req, res) => {
	const id = req.params.id;
	const updatedEntry = req.body;
	updatedEntry.id = id;
	if (!updatedEntry) {
		res.status(400).json({
			message:
				"Please provide the updated entry in the body of the request and try again",
		});
	}
	try {
		const updated = await BucketLists.updateEntry(updatedEntry, id);
		res.status(201).json(updated);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

//Removes a bucket list item
router.delete("/entry/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const deleted = await BucketLists.removeEntry(id);
		res.status(201).json(deleted);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

module.exports = router;
