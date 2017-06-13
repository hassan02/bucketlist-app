module.exports = function(req, res) {
    res.json({
        message: 'Welcome to the bucketlist api!',
        routes: {
            'POST /api/v1/auth/login': 'Log in with username and password',
            'POST /api/v1/auth/register': 'SIgn up with username and password',
            'GET /api/v1/bucketlist': 'Get all bucketlists',
            'POST /api/v1/bucketlist': 'Create a new bucketlist',
            'GET /api/v1/bucketlist/<bucketlist_id>': 'Get a single bucketlist',
            'PUT /api/v1/bucketlist/<bucketlist_id>': 'Update a single bucketlist',
            'DELETE /api/v1/bucketlist/<bucketlist_id>': 'Delete a single bucketlist',
            'POST /api/v1/bucketlist/<bucketlist_id>/items': 'Create a new item in a bucketlist',
            'GET /api/v1/bucketlist/<bucketlist_id>/items/<item_id>': 'Get a single item',
            'DELETE /api/v1/bucketlist/<bucketlist_id>/items/<item_id>': 'Delete a single item',
            'PUT /api/v1/bucketlist/<bucketlist_id>/items/<item_id>': 'Update a single item',
        }
    });
}
