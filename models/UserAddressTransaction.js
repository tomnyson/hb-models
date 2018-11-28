/**
 * Created by A on 7/18/17.
 */
'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
mongoose.Promise = global.Promise;

const Model = new Schema({
    identify: {type: String, index: {unique: true}},
    blockNumber: { type: Number, required: true, index: 1 },
    timeStamp: { type: Number, required: true, index: 1 },
    date: String,
    hash: { type: String, required: true, index: 1 },
    nonce: Number,
    blockHash: String,
    transactionIndex: Number,
    from: { type: String, ref: 'chat_user_address', index: 1 },
    to: { type: String, ref: 'chat_user_address', index: 1 },
    value: Number,
    gas: Number,
    gasPrice: Number,
    isError: Number,
    txreceipt_status: String,
    input: String,
    contractAddress: String,
    cumulativeGasUsed: Number,
    gasUsed: Number,
    confirmations: Number,
    balanceFrom: Number,
    balanceTo: Number,
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
module.exports = mongoose.model('chat_user_address_transaction', Model);