/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1125843985")

  // update collection data
  unmarshal({
    "createRule": "owner = @request.auth.id && @request.body.ocr_text:isset = false"
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text819050253",
    "max": 0,
    "min": 0,
    "name": "ocr_text",
    "pattern": "",
    "presentable": true,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1125843985")

  // update collection data
  unmarshal({
    "createRule": "owner = @request.auth.id"
  }, collection)

  // remove field
  collection.fields.removeById("text819050253")

  return app.save(collection)
})
