const express = require('express');
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {
    check,
    validationResult
} = require('express-validator');

module.exports.registerValidator = () => {
    return [
        check('email').notEmpty().withMessage('email is required'),
        check('email').isEmail().withMessage('email is not valid'),
        check('name').notEmpty().withMessage('Name is required'),
        check('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({
            min: 8
        })
        .withMessage('password must be 8 characters'),
    ]
}
module.exports.loginValidator = () => {
    return [
        check('email').notEmpty().withMessage('email is required'),
        check('email').isEmail().withMessage('email is not valid'),
        check('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({
            min: 8
        })
        .withMessage('password must be 8 characters'),

    ]
}


module.exports.userSign = async (req, res) => {
    const messages = []
    if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        for (const i of errors) {
            messages.push(i)
        }
        res.status(303).json({
            message: messages
        });
    }
    const {
        email,
        password
    } = req.body
    try {
        const finduser = await User.findOne({
            email
        });
        if (!finduser) {
            res.status(303).json({
                message: "User not found available"
            });
        } else {
            const pass = await bcrypt.compare(password,finduser.password)
            if (pass) {
                const token = jwt.sign({
                    id: finduser._id,
                    email: finduser.email
                }, process.env.SECRET_CODE);

                res.status(200).json({
                    id: finduser._id,
                    token: token
                });
            } else {
                res.status(303).json({
                    message: "password not match"
                });
            }

        }

    } catch (err) {
        console.log(err);
    }

}

module.exports.userSignup = async (req, res) => {

    const messages = []
    if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        for (const i of errors) {
            messages.push(i);
        }
        res.status(303).json({
            message: messages
        });
    }
    const {
        email,
        name,
        password
    } = req.body;

    try {
        const finduser = await User.findOne({
            email
        });
        if (finduser) {
            res.status(303).json({
                message: "User email not available"
            });
        } else {
            const pass = await bcrypt.hash(password, 12);
            const user = await new User({
                email: email,
                name: name,
                password: pass
            });
            user.save();
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.SECRET_CODE);

            res.status(201).json({
                user: user,
                token: token
            });
        }
    } catch (error) {
        res.status(303).json({
            error: error
        });
    }



}