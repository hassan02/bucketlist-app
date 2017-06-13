var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encrypt'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config');

function fetchAllUsers() {
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            return "no user found"
        } else {
            return collection
        }
    })
}

function validateUserData(userData) {
    return userData.username && userData.password
}

exports.login = function(req, res) {
    var userData = req.body;
    if (!(validateUserData(userData))) {
        return res.status(400).json({
            error: "Username or password blank"
        })
    }

    User.findOne({
        username: userData.username
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                error: err.toString()
            })
        }
        if (!user) {
            return res.status(400).json({
                message: 'Authentication failed. Username not found'
            });
        }
        if (user) {
            if (user.password === encrypt.hashPwd(user.salt, userData.password)) {
                var token = jwt.sign(user, config.secret, {
                    expiresIn: '1440m'
                });
                return res.status(200).json({
                    token: token,
                    expiresIn: '1440 minutes'
                });
            } else {
                return res.status(400).json({
                    message: 'Authentication failed. Wrong password.'
                });
            }
        }
    });
}

exports.register = function(req, res) {
    var userData = req.body;
    if (!(validateUserData(userData))) {
        return res.status(400).json({
            error: "Username or password blank"
        })
    }
    userData.salt = encrypt.createSalt()
    userData.password = encrypt.hashPwd(userData.salt, userData.password);
    var user = new User(userData)
    user.save(function(err) {
        if (err) {
            if (err.name === "MongoError" && err.code === 11000) {
                return res.status(400).json({
                    error: "Username already exist"
                })
            }
            return res.status(400).json({
                error: err.toString()
            })
        }
        var token = jwt.sign(user, config.secret, {
            expiresIn: '1440m'
        });
        return res.status(201).json({
            token: token
        })
    })
}
