const mongoose = require("mongoose");
const User = require('../models/usersModel');
const roomSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    price: {
        type: Number,

    },
    address: {
        type: String,

    },
    details: {
        bathrooms: {
            type: Number,

        },
        listed_by: {
            type: String,

        },
        parking: {
            type: String,

        },

    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    description: {
        type: String,

    },
    images: [{
        type: String
    }]

}, {
    timestamps: true
});

const roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;