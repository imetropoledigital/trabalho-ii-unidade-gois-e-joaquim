const express = require('express');
const service = require('./service')
const app = express();
const PORT = 3000;


app.use(express.json())

app.get('/:collection', async (req, res) => {
    let collection = req.params.collection
    try {
        const docs = await service.findAll(collection)
        res.send(docs)
    } catch (e) {
        console.log(e)
        res.status(500)
    }
})

app.post('/:collection', async (req, res) => {
    const collection = req.params.collection
    const doc = req.body

    try {
        const result = await service.create(collection, doc)
        res.status(201).send(result)
    } catch (e) {
        console.log(e)
        res.status(500)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
});
