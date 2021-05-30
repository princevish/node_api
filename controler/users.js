const User = require('../models/usersModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {
    validationResult
} = require('express-validator');
const fs =require('fs')

module.exports.userSign = async (req, res) => {
    const messages = []
    if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        for (const i of errors) {
            messages.push(i)
        }
        return res.status(303).json({
            message: messages
        });
    }

    try {
        const {
            email,
            password
        } = req.body
        const finduser = await User.findOne({
            email
        });
        if (!finduser) {
            return res.status(303).json({
                message: "User not found available"
            });
        } else {
            const pass = await bcrypt.compare(password, finduser.password)
            if (pass) {
                const token = jwt.sign({
                    id: finduser._id,
                    email: finduser.email
                }, process.env.SECRET_CODE);

                return res.status(200).cookie('key', token, {
                    sameSite: 'strict',
                    path: '/',
                    httpOnly: true,
                    expires: new Date(new Date().getTime() + 100 * 1000)
                }).json({
                    id: finduser._id,
                    token: token
                });
            } else {
                return res.status(303).json({
                    message: "password not match"
                });
            }

        }

    } catch (err) {
        console.log(err);
    }

}

module.exports.userSignup = async (req, res) => {

    try {
         /// validation check result
        const messages = []
        if (!validationResult(req).isEmpty()) { 
            // remove profile image
            fs.unlinkSync(`upload/profile/${req.file.filename}`)
            const errors = validationResult(req).array()
            for (const i of errors) {
                messages.push(i);
            }
            return res.status(303).json({
                message: messages
            });
        }

        const {
            email,
            name,
            mobile,
            password
        } = req.body;
        const finduser = await User.findOne({
            email
        });
        if (!finduser && email && name && mobile && password) {

            const pass = await bcrypt.hash(password, 12);
            const user = await User.create({
                email: email,
                name: name,
                mobile: mobile,
                password: pass,
                image:`profile/${req.file.filename}`
                
            });
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.SECRET_CODE);

           return res.status(201).cookie('key', token, {
                sameSite: 'strict',
                path: '/',
                httpOnly: true,
                expires: new Date(new Date().getTime() + 100 * 1000)
            }).json({
                user: user,
                token: token
            });

        } else {
            if(req.file.filename){
                // profile image remove
            fs.unlinkSync(`upload/profile/${req.file.filename}`)}
           return res.status(303).json({
                message: "User email not available"
            });

        }
    } catch (err) {
       return res.status(303).json({
            message: err
        });
    }

}

module.exports.logOut=(req, res) => {
    try {
        if (req.cookies.key) {
            res.clearCookie('key');
            res.status(302).json({
                msg: "logout"
            });
        } else {
            res.status(404).json({
                error: "cookie not found"
            });
        }

    } catch (err) {
        res.status(404).json({
            error: err
        });
    }

}