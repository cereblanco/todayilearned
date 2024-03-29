# MongoDB In Action

- [MongoDB In Action](#mongodb-in-action)
    - [SHOW](#show)
    - [INSERT-UPDATE-UPSERT-DELETE](#insert-update-upsert-delete)
    - [FILTER / SORT](#filter--sort)
    - [RENAME](#rename)

### SHOW

Connect to mongo server
```javascript
mongo
```

Show all databases
```javascript
show dbs
```

Use a database
```javascript
use database_name
```

Show the existing database you are using
```javascript
db
```

Show all collections in the database
```javascript
show collections
```

Show entries in a collection named `projects`
```javascript
db.projects.find()
```
better with prettify-ed result
```javascript
db.projects.find().pretty()
```

Limit the number of results to 5
```javascript
db.projects.find().limit(5).pretty()
```

Show the total entries in projects
```javascript
db.projects.find().count()
```

### INSERT-UPDATE-UPSERT-DELETE

Inserting an entry to a collection
```javascript
db.projects.insert({"name": "Test project"})

// it will output something with unique object id

{ "_id" : ObjectId("5ebce8d6c94bcf9b83e2f21c"), "name" : "Test project" }
```

Find entry with specific filter, say the unique object _id
```javascript
db.projects.find({"_id": ObjectId("5ebce8d6c94bcf9b83e2f21c")}).pretty()

// it will find the entry inserted previously

{ "_id" : ObjectId("5ebce8d6c94bcf9b83e2f21c"), "name" : "Test project" }

```

Update existing project; first parameter in {} is a match, second parameter in {} is the new value
```javascript
db.projects.update({"_id": ObjectId("5ebce8d6c94bcf9b83e2f21c")}, {"name":"Updated name"})

// here is an updated name

{ "_id" : ObjectId("5ebce8d6c94bcf9b83e2f21c"), "name" : "Updated name" }

```

Add new field without overwriting the existing fields! use `$set`
```javascript
db.projects.update(
    {"_id": ObjectId("5ebce8d6c94bcf9b83e2f21c")},
    {$set:{"description":"Update the description without removing name"}}
)

// it will update the project with a new field description

{
    "_id" : ObjectId("5ebce8d6c94bcf9b83e2f21c"),
    "name" : "Updated name",
    "description" : "Update the description without removing name"
}
```

Removing the `$set` will remove existing fields
```javascript
db.projects.update(
    {"_id": ObjectId("5ebce8d6c94bcf9b83e2f21c")},
    {"description":"Update description, but remove field name"}
)

// it will update the project, removing the name which previously exists

{
    "_id" : ObjectId("5ebce8d6c94bcf9b83e2f21c"),
    "description" : "Update description, but remove field name"
}
```

Upsert entry; insert new entry if a match does NOT exist yet
```javascript
db.projects.update(
    {"_id" : ObjectId("5ebcf1904548de076e1dd9bf")},
    {
        "name": "New project",
        "description":"This is a new project, it will upsert"
    },
    {"upsert": true}
)

// since the filter didn't match any, it inserted a new entry with new object id

{
    "_id" : ObjectId("5ebcf1904548de076e1dd9bf"),
    "name" : "New project",
    "description" : "This is a new project, it will upsert"
}
```

Upsert entry; we know an entry is existing; running upsert will not create duplicate but update the existing entry
```javascript
db.projects.update(
    {"_id" : ObjectId("5ebcf1904548de076e1dd9bf")},
    {"name": "Upsert existing project", "description": "This is an existing project, it will upsert"},
    {"upsert": true}
)
// since the filter matched one, it updated the old entry
{
    "_id" : ObjectId("5ebcf1904548de076e1dd9bf"),
    "name" : "Upsert existing project",
    "description" : "This is an existing project, it will upsert"
}
```

Remove an entry. In real world, use with warning, better if just create a `status` field for archived,active etc
```javascript
// will delete the entries inserted previously
db.projects.remove({"_id": ObjectId("5ebd043d03263e81820e55b1")});
db.projects.remove({"_id": ObjectId("5ebce8d6c94bcf9b83e2f21c")});
```

Insert in bulk
```javascript
// will use these entries in the upcoming actions
db.projects.insert([
    {
        "name": "Draft Project",
        "description":"This is a draft project, will be inserted in bulk",
        "status": "draft",
        "stars": 0
    },
    {
        "name": "Published Project",
        "description":"This is a published project, will be inserted in bulk",
        "status": "published",
        "stars": 700
    },
    {
        "name": "Archived Project",
        "description":"This is an archived project, will be inserted in bulk",
        "status": "archived",
        "stars": 1000
    },
])
```

### FILTER / SORT

Filter by field `status` with `$or`
```javascript
// select projects where status is draft or published
db.projects.find({$or:[{"status": "draft"}, {"status":"published"}]}).pretty()
```

Filter with `lt` less than and `gt` greater than
```javascript
// stars less than 500
// will output Draft Project
db.projects.find({"stars": {$lt: 500}}).pretty();

// stars greater than 500
// will output Published Project & Archived Project
db.projects.find({"stars": {$gt: 500}}).pretty();

```

List and sort by `stars` in ascending order `{"stars": 1}`
```javascript
// projects in ascending order where their stars are is 0, 700, 1000 correspondingly
db.projects.find().sort({"stars": 1 }).pretty();
```

List and sort by `stars` in descending order `{"stars": -1}`
```javascript
// projects in descending order where their stars are is 1000, 700, 0 correspondingly
db.projects.find().sort({"stars": -1 }).pretty();
```

### RENAME

Rename a field using `$rename`, and `$multi` to update all/multiple matched entries
```javascript
// rename stars field with number_of_claps
db.projects.update({"stars": {$exists: true}}, {$rename: {"stars":"number_of_claps"}}, { multi: true });
```
