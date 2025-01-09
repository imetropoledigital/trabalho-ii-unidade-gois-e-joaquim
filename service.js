const config = require('./dbConfig')
var ObjectId  = require('mongodb').ObjectId

async function findAll(collection) {
    const db = await config.connect()
    return db.collection(collection).find().toArray()
}

async function create(collection, doc) {
    const db = await config.connect()
    console.log("Connected to database")

    const result = await db.collection(collection).insertOne(doc)
    console.log(`New collection: ${collection} created with the following id: ${result.insertedId}`)
    return result
}

async function findOne(collection, id) {
    const db = await config.connect()
    console.log('Connected to database')
    const result = await db.collection(collection).findOne({_id: new ObjectId(id)})
    if (result == null)
        console.log(`Could not found document with id: ${id} on collection: ${collection}`)
    else 
        console.log(`Found in collection: ${collection} document with id: ${result._id}`)
    console.log(result)
    return result
}

module.exports = { findAll, create, findOne }