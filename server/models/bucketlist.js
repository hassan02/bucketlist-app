var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var bucketlistSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: '{PATH} is required!',
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
}, {
    timestamps: {
        createdAt: 'date_created',
        updatedAt: 'date_modified'
    }
})
mongoose.model('Bucketlist', bucketlistSchema)
bucketlistSchema.plugin(autoIncrement.plugin, {
    model: 'Bucketlist',
    field: 'id',
    startAt: 1
});
