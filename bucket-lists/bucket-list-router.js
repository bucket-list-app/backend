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
//TODO route needs to be tested
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

//Removes a bucket list item
//TODO need to test this route
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
//TODO need to test this route
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
//TODO need to test this route
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

// Returns all findPhotos
// TODO this route still needs to be tested
router.get("/pictures", async (req, res) => {
	try {
		const photos = await BucketLists.findPhotos();
		res.status(201).json(photos);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

// Adds a photo to db
// I think that we may need to pass a bucket list id into this one
// TODO still needs to be tested.
router.post("/pictures", async (req, res) => {
	const photo = req.body;
	if (!photo) {
		res.status(401).json({
			message:
				"please provide a path to the photo in the body of the request as photo: ",
		});
	}
	try {
		const added = await BucketLists.addPhoto(photo);
		res.status(201).json(added);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

// Updates a photo
// TODO Need to set up the Photos table with an unique id so that we can target them directly.
// TODO still needs to be tested
router.put("/pictures/:id", async (req, res) => {
	const id = req.params.id;
	const newPhoto = req.body.photo;

	if (!newPhoto) {
		res
			.status(422)
			.json({
				message:
					"please provide a new photo to update with in the body of this request as {photo: newPhotoPath}",
			});
	}

	try {
		const updated = await BucketLists.updatePhoto(newPhoto, id);
		res.status(201).json(updated);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

// Removes the photo with {id}
// TODO still needs to be
router.delete("/pictures/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const removed = await BucketLists.removePhoto(id);
		res.status(201).json(removed);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

module.exports = router;
