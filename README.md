## Hello from the Bucket List App!

This is the Bucket List App api and thank you for comming :) Here we have all the tools necissary for storing and retriving all the data you could ever need for your bucket list app. Please take a moment to read through the routes and database schema set up here on the back end.

# Routes

## **/api/users**

`GET /api/users` - returns a list of all users

`GET /api/users/share` - returns all info on the SharedWithUsers table.

`GET /api/users/share/:id` - returns all of the users that share the bucket list with `:id`

`POST /api/users/share` - adds a sharedUser/bucketList id pair.

_DATA OBJECT REQUIRED IN THE BODY_

```json
{
	"user_id": 1, //The user id to share the list with
	"bucketList_id": 1 //The bucket list id being shared
}
```

## **/api/auth**

`POST /api/auth/register` - adds a user to the db.

_DATA OBJECT REQUIRED IN THE BODY_

```json
{
	"username": "new username",
	"password": "new password"
}
```

#

`POST /api/auth/login` - logs a user in based on credentials in the body of the request.

_DATA OBJECT REQUIRED IN THE BODY_

```json
{
	"username": "new username",
	"password": "new password"
}
```

#

`DELETE /api/auth/logout` - Logs a user out of the app by removing its session and cookie.

#

## **/api/buckelists**

`GET /api/bucketLists` - Returns all bucket lists.

#

`POST /` - Adds a bucket list to the db.

_DATA REQUIRED IN THE BODY_

```json
{
	"name": "name of bucket list",
	"description": "description of bucket list",
	"user_id": 1 // id of the user that the created the bucketlist
}
```

#

`POST /api/bucketLists/:id` - Updates a bucket list already in the db. This bucket list has `/:id`

_DATA REQUIRED IN THE BODY_

```json
{
	"name": "name of bucket list",
	"description": "description of bucket list",
	"user_id": 1 // id of the user that the created the bucketlist
}
```

#

`DELET /api/bucketLists/:id` - Deletes a bucket list already in the db. This bucket list has `/:id`

#

`POST /api/bucketLists/item` - Adds an item to the db.

_DATA REQUIRED IN THE BODY_

```json
{
	"bucketList_id": 1, // id of the bucket list this item belongs to
	"name": "name of item",
	"description": "description of item"
}
```

#

`PUT /api/bucketLists/item/:id` - Updates a bucket list item with `/:id`.

_REQUIRED DATA IN BODY_

```json
{
	"bucketList_id": 1, // id of the bucket list this item belongs to
	"name": "name of item",
	"description": "description of item"
}
```

#

`DELETE /api/bucketLists/item/:id` - Deletes a bucket list item with `/:id`.

#

`GET /api/bucketLists/pictures` - Returns all the pictures in the db.

#

`POST /api/bucketLists/pictures` - Adds a photo to the db.

_REQUIRED DATA IN BODY_

```json
{
	"path": "path to photo",
	"item_id": 1 // id of the bucket list item that this photo belongs to
}
```

#

`PUT /api/bucketLists/pictures/:id` - Updates a photo in the db with `/:id`.

_REQUIRED DATA IN BODY_

```json
{
	"path": "path to updatede photo",
	"item_id": 1 // id of the bucket list item that this photo belongs to
}
```

#

`DELET /api/bucketLists/pictures/:id` - Deletes a photo in the db with `/:id`.

#

`GET /api/bucketLists/entry` - Returns all the entries in the db.

#

`POST /api/bucketLists/entry` - Adds a bucket list item jurnal entry to the db.

_REQUIRED DATA IN BODY_

```json
{
	"entry": "journal entry",
	"item_id": 1 // id of the bucket list item that this photo belongs to
}
```

#

`PUT /api/bucketLists/entry/:id` - Updates a bucket list item jurnal entry in the db with `/:id`.

_REQUIRED DATA IN BODY_

```json
{
	"entry": "updated journal entry",
	"item_id": 1 // id of the bucket list item that this photo belongs to
}
```

#

`DELETE /api/bucketLists/entry/:id` - Deletes a bucket list item jurnal entry in the db with `/:id`.

# Database Schema

#### Users Table

|   Name   | Data Type |                    Info                    |
| :------: | :-------: | :----------------------------------------: |
|    id    |  integer  |    Auto incraments. Do not need to add     |
| username |   text    |    Can not be null. Needs to be unique     |
| password |   text    | This is hashed before it is sent to the db |

#### Bucketlists Table

|  Name   | Data Type |                   Info                   |
| :-----: | :-------: | :--------------------------------------: |
|   id    |  integer  |   Auto incraments. Do not need to add.   |
|  name   |   text    |  The name of the bucket list. Required   |
| user_id |  integer  | The id of the user who created the tabel |

#### BucketListItems Table

|     Name      | Data Type |                        Info                         |
| :-----------: | :-------: | :-------------------------------------------------: |
|      id       |  integer  |        Auto incraments. Do not need to add.         |
| bucketList_id |  integer  | The id of the bucket list that this item belongs to |
|     name      |   text    |            Name of the bucket list item             |
|  description  |   text    |            Description of the list item             |

#### ShareWithUsers Table

|     Name      | Data Type |                                             Info                                              |
| :-----------: | :-------: | :-------------------------------------------------------------------------------------------: |
|    user_id    |  integer  |            The id of a user associated with the bucketlist id in the next collumn             |
| bucketList_id |  integer  | The id of the bucket list that is shared with the user tied to the id in the previous column. |

#### Photos Table

|    Name    | Data Type |                           Info                            |
| :--------: | :-------: | :-------------------------------------------------------: |
|     id     |  integer  |           Auto incraments. Do not need to add.            |
|    path    |   text    |           The path to the photo added. Required           |
| time_stamp | TimeStamp |      The time that this content was posted to the db      |
|  item_id   |  integer  | The id of the bucket list item that this photo belongs to |

#### Photos Table

|    Name    | Data Type |                           Info                            |
| :--------: | :-------: | :-------------------------------------------------------: |
|     id     |  integer  |           Auto incraments. Do not need to add.            |
|   entry    |   text    |                The journal entry. Required                |
| time_stamp | TimeStamp |      The time that this content was posted to the db      |
|  item_id   |  integer  | The id of the bucket list item that this photo belongs to |
