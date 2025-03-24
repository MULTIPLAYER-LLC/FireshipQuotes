/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3722373435")

  // update collection data
  unmarshal({
    "name": "postVoteCount"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_wis6")

  // remove field
  collection.fields.removeById("_clone_rBuo")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "_clone_MnZo",
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

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1125843985",
    "hidden": false,
    "id": "_clone_3MpM",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "post",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3722373435")

  // update collection data
  unmarshal({
    "name": "voteCount"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "_clone_wis6",
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

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1125843985",
    "hidden": false,
    "id": "_clone_rBuo",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "post",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_MnZo")

  // remove field
  collection.fields.removeById("_clone_3MpM")

  return app.save(collection)
})
