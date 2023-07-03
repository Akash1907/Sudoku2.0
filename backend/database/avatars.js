const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
    avatarID : Number,
    url : String
});

module.exports = mongoose.model('avatars', avatarSchema);