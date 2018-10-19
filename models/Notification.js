/**
 * Created by A on 7/18/17.
 */
'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
mongoose.Promise = global.Promise;

const Model = new Schema({
    address: { type: String, required: true, index: 1 },
    userId: { type: String, required: true, ref: 'chat_user', index: 1 },
    devices: { type: Array, default: [] },
    os: { type: String },
    message: { type: String },
    error: {type: String},
    data: Object,
    title: String,
    resent: {type: Number, default: 0},
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
module.exports = mongoose.model('chat_notification', Model);