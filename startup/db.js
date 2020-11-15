const mongoose = require('mongoose');

let dbUrl = '';
async function initDB() {
    if (process.env.NODE_ENV === "production") {
        dbUrl = "mongodb+srv://mostafamoneib:aimpassword@cluster0.9pkyx.mongodb.net/mydb?retryWrites=true&w=majority"
    }
    else dbUrl = "mongodb://localhost:27017/mydb";
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.connect(dbUrl).then(() => {
        console.log(`Connect to ${dbUrl} on enviroment ${process.env.NODE_ENV} ..... `);
    });
}

const reconnectTimeout = 5000; // ms.
const db = mongoose.connection;

db.on('connecting', () => {
    console.log('Connecting to MongoDB...');
});

db.on('error', (error) => {
    console.log('MongoDB connection error', error);
    mongoose.disconnect();
});

db.on('connected', () => {
    console.log('Connected to MongoDB!');
});

db.once('open', () => {
    console.log('MongoDB connection opened!');
});

db.on('reconnected', () => {
    console.log('MongoDB reconnected!');
});

db.on('disconnected', () => {
    console.log(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
});

module.exports = {
    initDB,
    dbUrl,
};