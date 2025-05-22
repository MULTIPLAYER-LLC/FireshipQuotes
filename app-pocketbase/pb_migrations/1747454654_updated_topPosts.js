/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3914327978")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  (ROW_NUMBER() OVER (ORDER BY SUM(\n    CASE\n      WHEN votes.vote_type = 'upvote' THEN 1\n      WHEN votes.vote_type = 'downvote' THEN -1\n      ELSE 0\n    END\n  ) DESC)) as id,\n  SUM(\n    CASE\n      WHEN votes.vote_type = 'upvote' THEN 1\n      WHEN votes.vote_type = 'downvote' THEN -1\n      ELSE 0\n    END\n  ) as score,\n  posts.id as post\nFROM posts\nLEFT JOIN votes ON posts.id = votes.post\nGROUP BY posts.id;"
  }, collection)

  // remove field
  collection.fields.removeById("number848901969")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "json848901969",
    "maxSize": 1,
    "name": "score",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3914327978")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  (ROW_NUMBER() OVER(ORDER BY count(votes.id) DESC)) as id,\n  count(votes.id) as score,\n  posts.id as post\nFROM votes\nRIGHT OUTER JOIN posts ON posts.id = votes.post\nGROUP BY posts.id;"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
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
  }))

  // remove field
  collection.fields.removeById("json848901969")

  return app.save(collection)
})
