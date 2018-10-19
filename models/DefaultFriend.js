/**
 * Created by A on 7/18/17.
 */
'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
mongoose.Promise = global.Promise;
const Model = new Schema({
    userId: {type: String, required: true, index: {unique: true}},
    createdAt: { type: Date, index: 1 },
    updatedAt: { type: Date, index: 1 },
});
Model.pre('save', function(next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
Model.pre('update', function() {
    this.update({}, { $set: { updatedAt: new Date() } });
});
module.exports = mongoose.model('chat_default_friend', Model);