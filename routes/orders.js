const express = require('express');

function ordersRoutes(client) {
    const router = express.Router();
    const collection = client.db("education").collection("orders");

    // GET all orders with optional query string filters
    router.get('/', async (req, res) => {
        try {
            // Construct a query object based on query string parameters
            let query = {};
            if (req.query.status) {
                query.status = req.query.status;
            }
            if (req.query.title) {
                query.title = req.query.title;
            }
            // Add more filters as needed

            const orders = await collection.find(query).toArray();
            res.json(orders);
        } catch (e) {
            res.status(500).send(e.message);
        }
    });


    // GET an order by ID
    router.get('/:id', async (req, res) => {
        try {
            const order = await collection.findOne({ _id: new client.ObjectID(req.params.id) });
            if (!order) return res.status(404).send('Order not found');
            res.json(order);
        } catch (e) {
            res.status(500).send(e.message);
        }
    });

    // POST a new order
    router.post('/', async (req, res) => {
        try {
          
            const newOrder = req.body;
            const result = await collection.insertOne(newOrder);
            res.status(201).json(result.ops);
        } catch (e) {
            console.error(e); // Log the full error
            res.status(500).send(e.message);
        }
    });
    

    // PUT (update) an existing order
    router.put('/:id', async (req, res) => {
        try {
            const updatedOrder = req.body;
            const result = await collection.updateOne(
                { _id: new client.ObjectID(req.params.id) },
                { $set: updatedOrder }
            );
            if (result.matchedCount === 0) return res.status(404).send('Order not found');
            res.json(await collection.findOne({ _id: new client.ObjectID(req.params.id) }));
        } catch (e) {
            res.status(500).send(e.message);
        }
    });

    // DELETE an order
    router.delete('/:id', async (req, res) => {
        try {
            const result = await collection.deleteOne({ _id: new client.ObjectID(req.params.id) });
            if (result.deletedCount === 0) return res.status(404).send('Order not found');
            res.status(204).send();
        } catch (e) {
            res.status(500).send(e.message);
        }
    });

    return router;
}

module.exports = ordersRoutes;
