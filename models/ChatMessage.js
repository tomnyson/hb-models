const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
mongoose.Promise = global.Promise;

const Model = new Schema({
    from: { type: String, required: true, index: 1 },
    fromId: { type: String, required: true, index: 1 },
    to: { type: String, required: true, index: 1 },
    toId: { type: String, required: true, index: 1 },
    type: { type: Number, required: true, index: 1 },
    message: String,
    requestId: String,
    payId: String,
    txtId: { type: String, required: true, index: 1 },
    userImage: String,
    userName: String,
    txHash: String,
    receiver: String,
    isBlock: { type: Boolean, default: false },
    isComplete: { type: Boolean, required: true, index: 1, default: false },
    status: { type: Number, required: true, index: 1, default: 1 },
    deleteBy: { type: [String], default: [] },
    isPrivate: { type: Boolean, default: true },
    resetCount: { type: Number, default: 0 },
    numReceiver: { type: Number, default: 0 },
    numReceived: { type: Number, default: 0 },
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
module.exports = mongoose.model('chat_message', Model);