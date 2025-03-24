/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
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
      },
      {
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
      },
      {
        "hidden": false,
        "id": "number369675193",
        "max": null,
        "min": null,
        "name": "num_votes",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      }
    ],
    "id": "pbc_3722373435",
    "indexes": [],
    "listRule": "",
    "name": "voteCount",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n    (ROW_NUMBER() OVER()) as id,\n    votes.vote_type as vote_type,\n    votes.post, -- optional field to allow expand of the post record\n    count(votes.id) as num_votes\nFROM votes\nGROUP BY votes.post, votes.vote_type",
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3722373435");

  return app.delete(collection);
})
