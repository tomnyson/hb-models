/**
 * Created by bacoor on 9/5/18.
 */
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
mongoose.Promise = global.Promise;
const Model = new Schema({
    id: { type: String, required: true, index: { unique: true } },
    name: { type: String, index: 1 },
    symbol: { type: String, required: true, index: 1 },
    createdAt: { type: Date, index: 1 },
    updatedAt: { type: Date, index: 1 },
}, { strict: false });
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
module.exports = mongoose.model('hb_coinmarketcap_token', Model);