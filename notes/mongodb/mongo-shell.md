# MongoDB In Action

Connect to mongo server
```
mongo
```

Show all databases
```
show dbs
```

Use a database
```
use database_name
```

Show the existing database you are using
```
db
```

Show all collections in the database
```
show collections
```

Show entries in a collection named `projects`
```
db.projects.find()
```
better with prettify-ed result
```
db.projects.find().pretty()
```

Inserting an entry to a collection
```
db.projects.insert({"name": "Test project"})

// it will output something with unique object id

{ "_id" : ObjectId("5ebce8d6c94bcf9b83e2f21c"), "name" : "Test project" }
```

Find entry with specific filter, say the unique object _id
```
db.projects.find({"_id": ObjectId("5ebce8d6c94bcf9b83e2f21c")}).pretty()

// it will find the entry inserted previously

{ "_id" : ObjectId("5ebce8d6c94bcf9b83e2f21c"), "name" : "Test project" }

```

Update existing project; first parameter in {} is a match, second parameter in {} is the new value
```
db.projects.update({"_id": ObjectId("5ebce8d6c94bcf9b83e2f21c")}, {"name":"Updated name"})

// here is an updated name

{ "_id" : ObjectId("5ebce8d6c94bcf9b83e2f21c"), "name" : "Updated name" }

```

Add new field without overwriting the existing fields! operative word: `$set`
```
db.projects.update(
    {"_id": ObjectId("5ebce8d6c94bcf9b83e2f21c")},
    {$set:{"description":"Update the description without removing name"}}
)

// it will output an entry with new field description, but will keep name field

{
    "_id" : ObjectId("5ebce8d6c94bcf9b83e2f21c"),
    "name" : "Updated name",
    "description" : "Update the description without removing name"
}
```

Removing the `$set` will remove existing fields
```
db.projects.update(
    {"_id": ObjectId("5ebce8d6c94bcf9b83e2f21c")},
    {"description":"Update description, but remove field name"}
)

// it will output an entry without the name field

{
    "_id" : ObjectId("5ebce8d6c94bcf9b83e2f21c"),
    "description" : "Update description, but remove field name"
}
```

Upsert entry; insert new entry if a match does NOT exist yet
```
db.projects.update(
    {"_id" : ObjectId("5ebcf1904548de076e1dd9bf")},
    {"name": "New project", "description":"This is a new project, it will upsert"},
    {"upsert": true}
)

// since the filter didn't match any, it inserted a new entry with new object id

{
    "_id" : ObjectId("5ebcf1904548de076e1dd9bf"),
    "name" : "New project",
    "description" : "This is a new project, it will upsert"
}
```

Upsert entry; Now we know an entry exists; running upsert will not create duplicate but update the existing entry
```
db.projects.update(
    {"_id" : ObjectId("5ebcf1904548de076e1dd9bf")},
    {"name": "Upsert existing project", "description": "This is an existing project, it will upsert"},
    {"upsert": true}
)
{
    "_id" : ObjectId("5ebcf1904548de076e1dd9bf"),
    "name" : "Upsert existing project",
    "description" : "This is an existing project, it will upsert"
}
```

Remove an entry. Use at your own risk! 
```
db.projects.remove({"_id": ObjectId("5ebcf1904548de076e1dd9bf")});
```

