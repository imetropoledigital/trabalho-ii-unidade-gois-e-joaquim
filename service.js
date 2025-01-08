const config = require('./dbConfig')

async function findAll(collection) {
    const db = await config.connect()
    return db.collection(collection).find().toArray()
}

async function create(collection, doc) {
    const db = await config.connect()
    console.log("Connected to database")

    const result = await db.collection(collection).insertOne(doc)
    console.log(`New listing created with the following id: ${result.insertedId}`)
    return result
}

module.exports = { findAll, create }