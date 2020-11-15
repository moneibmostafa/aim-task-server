const app = require('express')();
const http = require('http').createServer(app);

require('./startup/db').initDB();
require('./startup/routes')(app);

const hostname = '0.0.0.0';
const PORT = process.env.PORT || 3000;

const server = http.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});

exports.module = server;