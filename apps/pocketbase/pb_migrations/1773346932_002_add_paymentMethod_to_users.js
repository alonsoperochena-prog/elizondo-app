/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");

  const existing = collection.fields.getByName("paymentMethod");
  if (existing) {
    if (existing.type === "text") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("paymentMethod"); // exists with wrong type, remove first
  }

  collection.fields.add(new TextField({
    name: "paymentMethod",
    max: 255
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.fields.removeByName("paymentMethod");
  return app.save(collection);
})