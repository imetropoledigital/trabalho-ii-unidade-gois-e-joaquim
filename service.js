const config = require('./dbConfig')
var ObjectId  = require('mongodb').ObjectId

async function findAll(collection, query, fields, skip, limit) {
  const db = await config.connect();
  console.log("Connected to database");
  const cursor = db.collection(collection).find(query);
  if (fields) {
    cursor.project(fields);
  }
  cursor.skip(skip).limit(limit);
  const results = await cursor.toArray();
  console.log(`Queried ${collection} with results:`, results);
  return results;
}

async function findOneById(collection, id) {
  const db = await config.connect();
  console.log("Connected to database");
  const result = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });
  if (result == null)
    console.log(
      `Could not found document with id: ${id} on collection: ${collection}`
    );
  else
    console.log(
      `Found in collection: ${collection} document with id: ${result._id}`
    );
  console.log(result);
  return result;
}

async function create(collection, doc) {
  const db = await config.connect();
  console.log("Connected to database");

  const result = await db.collection(collection).insertOne(doc);
  console.log(
    `New collection: ${collection} created with the following id: ${result.insertedId}`
  );
  return result;
}

async function update(collection, id, doc) {
  const db = await config.connect();
  console.log("Connected to database");
  const result = await db
    .collection(collection)
    .updateOne({ _id: new ObjectId(id) }, { $set: doc });
  console.log(result);
  return result.modifiedCount;
}

module.exports = { findAll, create, findOneById, update };
