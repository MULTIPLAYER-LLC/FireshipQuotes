/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4258883199")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n    (ROW_NUMBER() OVER()) as id,\n    posts.owner,\n    votes.vote_type as vote_type,\n    count(votes.id) as num_votes\nFROM votes\nINNER JOIN posts ON posts.id = votes.post\nGROUP BY posts.owner, votes.vote_type\n"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_Rw18")

  // remove field
  collection.fields.removeById("_clone_M7Gu")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_v8Q6",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "owner",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "_clone_k0Hq",
    "maxSelect": 1,
    "name": "vote_type",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "upvote",
      "downvote"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4258883199")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n    posts.owner as id,\n    posts.owner,\n    votes.vote_type as vote_type,\n    count(votes.id) as num_votes\nFROM votes\nINNER JOIN posts ON posts.id = votes.post\nGROUP BY posts.owner, votes.vote_type"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_Rw18",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "owner",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "_clone_M7Gu",
    "maxSelect": 1,
    "name": "vote_type",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "upvote",
      "downvote"
    ]
  }))

  // remove field
  collection.fields.removeById("_clone_v8Q6")

  // remove field
  collection.fields.removeById("_clone_k0Hq")

  return app.save(collection)
})
