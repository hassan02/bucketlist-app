var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = require('bluebird');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    autoIncrement.initialize(db);
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('bucketlist db opened');
    });
    require('../models/user');
    require('../models/bucketlist');
    require('../models/item');
};
