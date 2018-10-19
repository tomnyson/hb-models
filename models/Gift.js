/**
 * Created by A on 7/18/17.
 */
'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
mongoose.Promise = global.Promise;
const Model = new Schema({
    userId: { type: String, required: true, index: 1 },
    commId: { type: String, required: true, index: 1 },
    name: String,
    symbol: String,
    value: Number,
    msgId: { type: String, required: true, index: 1 },
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
module.exports = mongoose.model('chat_gift', Model);