module.exports.index = function(req, res) {
    return res.render('index', {
        'user': users
    })
}

module.exports.login = function(req, res) {
    return res.render('login')
}

module.exports.signup = function(req, res) {
    return res.render('signup')
}

module.exports.bucketlist = function(req, res) {
    return res.render('bucketlist')
}
