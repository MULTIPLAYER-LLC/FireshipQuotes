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
      },
      {
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
    "id": "pbc_4258883199",
    "indexes": [],
    "listRule": null,
    "name": "userVoteCount",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n    posts.owner as id,\n    posts.owner,\n    votes.vote_type as vote_type,\n    count(votes.id) as num_votes\nFROM votes\nINNER JOIN posts ON posts.id = votes.post\nGROUP BY posts.owner, votes.vote_type",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4258883199");

  return app.delete(collection);
})
