var index = require('../controllers/index'),
    auth = require('../controllers/auth'),
    account = require('../controllers/account'),
    bucketlist = require('../controllers/bucketlist'),
    requireAuthentication = require('../utilities/authenticate'),
    requirePermission = require('../utilities/permission');

module.exports = function(app) {
    app.get('/', account.index)
    app.get('/login', account.login)
    app.get('/signup', account.signup)
    app.get('/bucketlist', account.bucketlist)
    app.get('/api/v1/', index);
    app.post('/api/v1/auth/login', auth.login);
    app.post('/api/v1/auth/register', auth.register);
    app.get('/api/v1/bucketlist', requireAuthentication, bucketlist.fetchAll);
    app.post('/api/v1/bucketlist', requireAuthentication, bucketlist.create)
    app.get('/api/v1/bucketlist/:bucketlistId(\\d+)/', requireAuthentication, bucketlist.fetchOne)
    app.put('/api/v1/bucketlist/:bucketlistId(\\d+)/', requireAuthentication, bucketlist.update)
    app.delete('/api/v1/bucketlist/:bucketlistId(\\d+)/', requireAuthentication, bucketlist.delete)
    app.post('/api/v1/bucketlist/:bucketlistId(\\d+)/items', requireAuthentication, bucketlist.createItem)
    app.get('/api/v1/bucketlist/:bucketlistId(\\d+)/items/:itemId(\\d+)', requireAuthentication, bucketlist.getItem)
    app.put('/api/v1/bucketlist/:bucketlistId(\\d+)/items/:itemId(\\d+)', requireAuthentication, bucketlist.updateItem)
    app.delete('/api/v1/bucketlist/:bucketlistId(\\d+)/items/:itemId(\\d+)', requireAuthentication, bucketlist.deleteItem)
}
