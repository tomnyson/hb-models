/**
 * Created by A on 7/18/17.
 */
'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
mongoose.Promise = global.Promise;

const Model = new Schema({
    address: { type: String, required: true, index: { unique: true } },
    userId: { type: String, required: true, ref: 'chat_user', index: 1 },
    eth: { type: Number, default: 0 },
    tokens: { type: Array, default: [] },
    tranxCurrentBlock: { type: Number, default: 0 },
    totalTransactions: { type: Number, default: 0 },
    tranxCurrentBlockInternal: { type: Number, default: 0 },
    totalTransactionsInternal: { type: Number, default: 0 },
    tranxCurrentBlockToken: { type: Number, default: 0 },
    totalTransactionsToken: { type: Number, default: 0 },
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
module.exports = mongoose.model('chat_user_address', Model);