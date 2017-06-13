var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
require('dotenv').config({
    silent: true
});

module.exports = {
    development: {
        db: 'mongodb://localhost/bucketlist',
        rootPath: rootPath,
        port: process.env.PORT || 3000,
        username: null,
        password: null,
        database: "my_app_development",
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://jeames:multivision@ds053178.mongolab.com:53178/multivision',
        port: process.env.PORT || 80,
    },
    secret: process.env.SECRET || 'secret'
}
