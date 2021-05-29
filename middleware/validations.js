const {
    check
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
        check('mobile')
        .notEmpty()
        .withMessage('mobile no. is required')
        .isLength({
            min: 10,
            max: 10
        })
        .withMessage('mobile no. must be 10 digit'),
       
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
        .withMessage('password must be 8 characters')
    ]
}
module.exports.roomValidator = () => {

    return [

        check('name').notEmpty().withMessage('name is required'),
        check('price').notEmpty().withMessage('price is required'),
        check('address').notEmpty().withMessage('address is required'),
        check('description').notEmpty().withMessage('description is required'),
        check('images').notEmpty().withMessage('image is required'),
        check('listed_by').notEmpty().withMessage('owner is required'),
        check('parking').notEmpty().withMessage('parking is required'),
        check('bathrooms').notEmpty().withMessage('bathrooms is required'),
        

    ]
}