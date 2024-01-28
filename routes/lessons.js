const express = require('express');

function lessonsRoutes(client) {
    const router = express.Router();
    const collection = client.db("education").collection("lessons");

    router.get('/', async (req, res) => {
       
        try {
            let query = {};
            let sort = {};
    
            // Search filter
            if (req.query.search) {
                query.$or = [
                    { LessonName: { $regex: req.query.search, $options: 'i' } },
                    { LessonLocation: { $regex: req.query.search, $options: 'i' } }
                ];
            }
    
            // Sorting
            if (req.query.sort) {
                let sortOrder = req.query.order === 'desc' ? -1 : 1;
                sort[req.query.sort] = sortOrder;
            }
    
            const lessons = await collection.find(query).sort(sort).toArray();
            res.json(lessons);
        } catch (e) {
            res.status(500).send(e.message);
        }
    });

    return router;
}

module.exports = lessonsRoutes;
