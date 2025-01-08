const { MongoClient } = require('mongodb')
const databaseUri = 'mongodb://localhost:27017'
let connection

async function connect() {
    if (connection) return connection

    const client = new MongoClient(databaseUri)
    await client.connect()

    connection = client.db("trabalho-2")
    return connection
}

module.exports = { connect }