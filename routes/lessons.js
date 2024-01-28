const express = require('express');
const { ObjectId } = require('mongodb');

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

    // PUT (update) an existing lessons
    router.put('/update-lessons', async (req, res) => {
        try {
            // Assuming req.body contains an array of updates
            const updates = req.body; // Example: [{ lessonId: "id1", newSpace: 10 }, { lessonId: "id2", newSpace: 15 }, ...]

            // Convert updates to a format suitable for bulkWrite
            const bulkUpdates = updates.map(update => ({
                updateOne: {
                    filter: { _id: new ObjectId(update.lessonId) },
                    update: { $set: { LessonSpace: update.newSpace } }
                }
            }));

            const result = await collection.bulkWrite(bulkUpdates);

            res.json({ message: 'Lessons updated', details: result });
        } catch (e) {
            res.status(500).send(e.message);
        }
    });


    return router;
}

module.exports = lessonsRoutes;
