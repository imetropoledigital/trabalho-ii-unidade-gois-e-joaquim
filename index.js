const express = require('express');
const service = require('./service')
const app = express();
const PORT = 3000;

app.use(express.json());

// Find all
app.get("/:collection", async (req, res) => {
  const collection = req.params.collection;

  // Parse query parameters and Convert regex strings
  let query = req.query.query ? JSON.parse(req.query.query) : {};
  for (const key in query) {
    if (query[key].$regex) {
      const regexParts = query[key].$regex.match(/^\/([^/]+)\/(.*)$/);
      if (regexParts) {
        query[key].$regex = new RegExp(regexParts[1], regexParts[2]);
      }
    }
  }
  const fields = req.query.fields
    ? req.query.fields.split(",").reduce((acc, field) => {
        acc[field.replace("-", "")] = field.startsWith("-") ? 0 : 1;
        return acc;
      }, {})
    : null;

  // Pagination parameters with default values
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const docs = await service.findAll(collection, query, fields, skip, limit);
    res.send(docs);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

// Find document per id
app.get("/:collection/:id", async (req, res) => {
  const collection = req.params.collection;
  const id = req.params.id;

  try {
    const result = await service.findOneById(collection, id);
    if (result == null)
      res
        .status(404)
        .send(
          `Could not found document with id: ${id} on collection: ${collection}`
        );
    else res.send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

// Create document
app.post("/:collection", async (req, res) => {
  const collection = req.params.collection;
  const doc = req.body;

  try {
    const result = await service.create(collection, doc);
    res.status(201).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

// Update document
app.put("/:collection/:id", async (req, res) => {
  const collection = req.params.collection;
  const id = req.params.id;
  const updates = req.body;

  try {
    const result = await service.update(collection, id, updates);
    if (result == 0)
      res
        .status(404)
        .send(
          `Could not found document with id: ${id} on collection: ${collection}`
        );
    else if (result > 0)
      res.send(
        `Document with id: ${id} was updated on collection: ${collection}`
      );
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
