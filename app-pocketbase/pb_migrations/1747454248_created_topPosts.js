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
        "id": "number848901969",
        "max": null,
        "min": null,
        "name": "score",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_1125843985",
        "hidden": false,
        "id": "relation1519021197",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "post",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      }
    ],
    "id": "pbc_3914327978",
    "indexes": [],
    "listRule": null,
    "name": "topPosts",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  (ROW_NUMBER() OVER(ORDER BY count(votes.id) DESC)) as id,\n  count(votes.id) as score,\n  posts.id as post\nFROM votes\nRIGHT OUTER JOIN posts ON posts.id = votes.post\nGROUP BY posts.id;",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3914327978");

  return app.delete(collection);
})
