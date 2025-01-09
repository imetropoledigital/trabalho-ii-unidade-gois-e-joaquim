const express = require('express');
const service = require('./service')
const app = express();
const PORT = 3000;


app.use(express.json())

// Find all
app.get('/:collection', async (req, res) => {
    let collection = req.params.collection
    try {
        const docs = await service.findAll(collection)
        res.send(docs)
    } catch (e) {
        console.log(e)
        res.status(500).send('Internal Server Error')
    }
})

// Find one per id
app.get('/:collection/:id', async (req, res) => {
    let collection = req.params.collection
    let id = req.params.id
    
    try {
        const result = await service.findOneById(collection, id)
        if (result == null) 
            res.status(404).send(`Could not found document with id: ${id} on collection: ${collection}`)
        else 
            res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send('Internal Server Error')
    }
})

// Create document
app.post('/:collection', async (req, res) => {
    const collection = req.params.collection
    const doc = req.body

    try {
        const result = await service.create(collection, doc)
        res.status(201).send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send('Internal Server Error')
    }
})

app.put('/:collection/:id', async (req, res) => {
    const collection = req.params.collection
    let id = req.params.id
    const doc = req.body

    try {
        const result = await service.update(collection, id, doc)
        if (result == 0)
            res.status(404).send(`Could not found document with id: ${id} on collection: ${collection}`)
        else if (result > 0)
            res.send(`Document with id: ${id} was updated on collection: ${collection}`)
    } catch (e) {
        console.log(e)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
