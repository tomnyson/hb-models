/**
 * Created by A on 7/18/17.
 */
'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
mongoose.Promise = global.Promise;
const Model = new Schema({
    name: { type: String, required: true, index: 1 },
    detail: String,
    private: { type: Boolean, default: false },
    image: String,
    channel_ids: [String],
    members: {
        count: {type: Number, default: 0},
        normal: [],
        admin: [],
    },
    link: String,
    profileImage: String,
    default: { type: Boolean, default: false },
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

module.exports = mongoose.model('chat_community', Model);