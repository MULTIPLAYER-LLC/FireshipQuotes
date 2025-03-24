/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4258883199")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_bpEs")

  // remove field
  collection.fields.removeById("_clone_eZMD")

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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4258883199")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_bpEs",
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
    "id": "_clone_eZMD",
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
  collection.fields.removeById("_clone_Rw18")

  // remove field
  collection.fields.removeById("_clone_M7Gu")

  return app.save(collection)
})
