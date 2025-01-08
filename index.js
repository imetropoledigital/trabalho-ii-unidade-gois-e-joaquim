const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;
const databaseUri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(databaseUri)

app.use(express.json())

app.get('/connect', async (req, res) => {
    try {
        await client.connect()
        await listDatabases(client)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
})

async function listDatabases(client) {
    dbList = await client.db().admin().listDatabases()
    console.log("Databases:")
    dbList.databases.forEach(db => console.log(` - ${db.name}`))
}

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.post('/:entity', async (req, res) => {

    const { collectionName } = req.params
    const entityData = req.body
    const entitySchema = new mongoose.Schema
})  

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
