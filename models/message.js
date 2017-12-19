var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');

var messageSchema = new Schema({
    content: {type: String, required:true},
    user: {type: Schema.Types.ObjectId, ref:'User'}
});

messageSchema.post('remove', function (message) {
    User.findById(message.user, function (err, user) {
       if(user){
           user.messages.pull(message._id);
           user.save();
       }
    });
});

module.exports = mongoose.model('Message', messageSchema);