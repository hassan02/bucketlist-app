var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var userSchema = Schema({
    username: {
        type: String,
        trim: true,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {
        type: String,
        required: '{PATH} is required!'
    },
    password: {
        type: String,
        required: '{PATH} is required!'
    },

})

userSchema.methods = {
    authenticate: function(password) {

    }
}

mongoose.model('User', userSchema)
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1
});
