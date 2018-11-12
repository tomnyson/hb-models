/**
 * Created by A on 7/18/17.
 */
'use strict';

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
mongoose.Promise = global.Promise;

const Model = new Schema({
    username: String,
    address: { type: String, required: true, index: { unique: true } },
    lang: { type: String, default: 'en' },
    image: String,
    password: {type: String, required: true},
    token: String,
    communities: [{
        id: { type: String, required: true, ref: 'chat_community' },
        isAdmin: Boolean,
        name: String,
        timeJoin: Date,
        _id: false,
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
        official: { type: Boolean, default: false },
        channels: [
            {
                id: String,
                name: String,
                type: Number
            }
        ]
    }],
    channels: [{
        id: { type: String, required: true, ref: 'chat_channel', index: 1 },
        name: String,
        timeJoin: Date,
        isSent: {type: Boolean, default: false},
        receiveNotification: {type: Boolean, default: false},
        _id: false
    }],
    friend_list: [{
        id: String,
        type: { type: String },
        username: { type: String},
        address: {type: String},
        link: { type: String},
        profileImage: { type: String},
        image: { type: String},
        lastOnlTime: { type: Date},
        isOnlTime: Boolean,
        receiveNotification: {type: Boolean, default: true},
        _id: false
    }],
    link: String,
    profileImage: String,
    chat_list: [{
        _id: false,
        msgId: String,
        firebaseDbId: String,
        image: String,
        from: {
            id: String,
            address: String,
            image: String,
            name: String,
            lastOnlTime: Date,
            isOnlTime: Boolean,
        },
        to: {
            id: String,
            address: String,
            image: String,
            name: String,
            lastOnlTime: Date,
            isOnlTime: Boolean,
        },
        type: { type: Number },
        isPrivate: Boolean,
        time: Date,
        communityName: String,
        communityId: String
    }],
    devices: [{
        deviceName: String,
        deviceToken: String,
        oneSignalId: String,
        lang: { type: String, default: 'en' },
        os: String,
    }],
    chatRequestTime: Number,
    lastOnlTime: { type: Date, index: 1 },
    isOnlTime: { type: Boolean, default: false, index: 1 },
    totalGift: Number,
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
module.exports = mongoose.model('chat_user', Model);