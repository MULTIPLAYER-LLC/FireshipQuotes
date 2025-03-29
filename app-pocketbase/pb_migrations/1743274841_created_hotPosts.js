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
        "id": "json848901969",
        "maxSize": 1,
        "name": "score",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_1506443736",
    "indexes": [],
    "listRule": null,
    "name": "hotPosts",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  posts.id as id,\n  (\n    (CAST(count(votes.id) as FLOAT)) /\n    ((strftime('%s', 'now')+1) - unixepoch(posts.created)) *\n    60 * 60\n  ) as score\nFROM votes\nRIGHT OUTER JOIN posts ON posts.id = votes.post\nGROUP BY posts.id",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1506443736");

  return app.delete(collection);
})
