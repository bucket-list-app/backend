const router = require('express').Router();

const BucketLists = require('./bucket-list-model');

router.get('/', async (req, res) => {
    try {
        const bucketLists = await BucketLists.find();
        res.json(bucketLists);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get Bucket Lists' });
    }
});

router.post('/', async (req, res) => {
    const bucketListData = req.body;
    try {
        const bucketList = await BucketLists.add(bucketListData);
        res.status(201).json(bucketList);
    } catch (err) {
        res.status(500).json({ message: "Failed to add Bucket List" });
    }
});

router.get('/item', async (req, res) => {
    try {
        const bucketListItems = await BucketLists.findBucketListItem();
        res.json(bucketListItems);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get Bucket List Item' });
    }
});

router.post('/item', async (req, res) => {
    const bucketListItemData = req.body;
    try {
        const bucketListItem = await BucketLists.addBucketListItem(bucketListItemData);
        res.status(201).json(bucketListItem);
    } catch (err) {
        res.status(500).json({ message: "Failed to add Bucket List Item" });
    }
});


module.exports = router;
