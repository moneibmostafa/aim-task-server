const mongoose = require('mongoose');

async function initDB() {
    // const db = "mongodb://localhost:27017/mydb";
    const db = "mongodb+srv://mostafamoneib:aimpassword@cluster0.9pkyx.mongodb.net/mydb?retryWrites=true&w=majority"
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    // mongoose.set('autoReconnect', false);
    // mongoose.plugin(accessibleRecordsPlugin);
    // if (process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "test") options = {}
    mongoose.connect(db).then(() => {
        console.log(`Connect to ${db} on enviroment ${process.env.NODE_ENV} ..... `);
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
    // setTimeout(() => initDB(), reconnectTimeout);
});

module.exports = {
    initDB,
};