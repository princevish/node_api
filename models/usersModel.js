var mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    name: {
        type: String,
        required: true

    },
    mobile: {
        type: String,
        
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
       
    },


}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;