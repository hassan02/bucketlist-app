var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var itemSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    bucketlist: {
        type: Schema.Types.ObjectId,
        ref: 'Bucketlist',
        required: true
    },
}, {
    timestamps: {
        createdAt: 'date_created',
        updatedAt: 'date_modified'
    }
})
mongoose.model('Item', itemSchema)
itemSchema.plugin(autoIncrement.plugin, {
    model: 'Item',
    field: 'id',
    startAt: 1
});
