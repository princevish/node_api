const User = require('../models/usersModel');
const Room = require('../models/roomModel')
const {
    validationResult
} = require('express-validator');


module.exports.getRoom = async (req, res) => {
    const room = await Room.find({});
    res.status(200).json({
        data: room
    });

}

module.exports.addRoom = async (req, res) => {

    const messages = []
    if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        for (const i of errors) {
            messages.push(i)
        }
        return  res.status(303).json({
            message: message
        });
    }
    try {
        const {
            name,
            price,
            address,
            details,
            description,
            images
        } = req.body;
        const createroom = await Room.create({
            name,
            price,
            address,
            details,
            description,
            images
        });

        room = await createroom.populate('user', 'name').execPopulate();
        res.status(200).json({
            data: room
        });
    } catch (err) {
        res.status(303).json({
            message: err
        });
    }


}