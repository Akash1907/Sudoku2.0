const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    name : String,
    password : String,
    avatarUrl : String,
    score : Object
});

module.exports = mongoose.model('users', userSchema);