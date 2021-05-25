
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {
    validationResult
} = require('express-validator');


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
            const pass = await bcrypt.compare(password, finduser.password)
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

 try{
     
    const messages = []
    if (!validationResult(req).isEmpty()) {
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
if (!finduser) {

    const pass = await bcrypt.hash(password, 12);
    const user = await User.create({
        email: email,
        name: name,
        mobile: mobile,
        password: pass
    });
    user.save();
    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.SECRET_CODE);

    res.status(201).cookie('key',token,{sameSite:'strict',path:'/',httpOnly:true}).json({
        user: user,
        token: token
    });

} else {
    res.status(303).json({
        message: "User email not available"
    });

}
}catch(err){
    res.status(303).json({
        message: err
    });
 }

    


}