const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const lessonsRoutes = require('./routes/lessons');
const ordersRoutes = require('./routes/orders');

const app = express();

// Use the PORT environment variable if it's set, otherwise default to 3000
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = 'mongodb+srv://mf883:0X5coeqrw5mFjRYS@mdx.nfeuxor.mongodb.net/?retryWrites=true&w=majority'; // MongoDB URI
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDb() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error(e);
    }
}

connectDb();

// Routes
app.use('/lessons', lessonsRoutes(client));
app.use('/orders', ordersRoutes(client));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});