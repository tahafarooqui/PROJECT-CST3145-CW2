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


// Logger middleware
function loggerMiddleware(req, res, next) {
    const currentDatetime = new Date();
    const formattedDate = `${currentDatetime.getFullYear()}-${currentDatetime.getMonth() + 1}-${currentDatetime.getDate()} ${currentDatetime.getHours()}:${currentDatetime.getMinutes()}:${currentDatetime.getSeconds()}`;
    const log = `[${formattedDate}] ${req.method}:${req.url}`;
    console.log(log);
    next();
}


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
// Register the logger middleware
app.use(loggerMiddleware);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});