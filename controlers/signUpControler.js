const { validationResult } = require("express-validator");
const database = require('../database/registerService');


let getSignUpPage = (req, res) => {
    res.render('register', {
        errors: req.flash("errors")
    })
}

let createNewUser = async (req, res) => {

    // check Validation
    let errorArr = [];
    let validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        let errors = Object.values(validationError.mapped());
        errors.forEach((item) => {
            errorArr.push(item.msg);
        })
        req.flash("errors", errorArr);
        res.redirect('/register');
    }
    else {
        try {
            let newUser = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.Address,
                dob: req.body.dob,
                contact: req.body.phone,
                email: req.body.email,
                password: req.body.password
            }
            // console.log(newUser);
            await database.createNewUser(newUser);
            res.redirect('/login');
        }
        catch (err) {
            console.log("in catch");
            req.flash("errors", err);
            res.redirect('/register');
        }

    }


}

exports = module.exports = {
    getSignUpPage,
    createNewUser
}