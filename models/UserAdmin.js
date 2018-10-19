/**
 * Created by bacoor on 9/14/18.
 */
'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const userModel = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
});

module.exports = mongoose.model('chat_user_admin', userModel);