const router = require('express').Router();

const Users = require('./user-model');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

//Gets all users a bucket list has been shared with
router.get("/share", async (req, res) => {
	try {
		const sharedWith = await Users.findSharedWithUsers();
		res.json(sharedWith);
	} catch (err) {
		res.status(500).json({ message: "Failed to get Shared User" });
	}
});

//adds a shared user to the bucket list
router.post("/share", async (req, res) => {
	const sharedUserData = req.body;
	try {
		const sharedUser = await Users.addSharedWithUser(sharedUserData);
		res.status(201).json(sharedUser);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});


module.exports = router;
