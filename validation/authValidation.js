const { body } = require('express-validator');

let validateRegister = [

    body('firstname', 'Enter First Name').isLength({ min: 2 }),

    body('email', 'Invalid Email').isEmail(),

    body('password', 'Password length must be atlease 2 char long').isLength({ min: 2 }),

    body("confirmationPassword", "Password confirmation does not match password").custom((value, { req }) => {
        console.log(value, req.body.password);
        return value === req.body.password
    }),

    body('phone', 'Enter 10 digit phone number').isLength({ min: 2 })


];


exports = module.exports = {
    validateRegister
}