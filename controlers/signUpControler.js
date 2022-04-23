const { validationResult } = require("express-validator");
const connection = require("../database/connection");

let getSignUpPage = (req, res) => {
    res.render('register', {
        errors: req.flash("errors")
    })
}

function createNU(req) {
    let newUser = {
        First_name: req.body.firstname,
        Last_name: req.body.lastname,
        Address: req.body.Address,
        dob: req.body.dob,
        Contact_No: req.body.phone,
        Email: req.body.email,
        Password: req.body.password
    };

    return new Promise((resolve, reject) => {
        checkEmailUser(newUser.Email)
            .then((rows) => {
                if (rows.length > 0) {
                    reject(`This email ${newUser.Email} already exist choose another email`);
                }
                else {
                    connection.query(
                        `
                    INSERT INTO user set ?
                    `,
                        newUser,
                        (err, rows) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve('Created a new user Successfully');
                            }
                        }
                    )
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
}

let createNewUser = (req, res) => {

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

        createNU(req)
            .then(() => {
                res.redirect('/login');
            })
            .catch((err) => {
                req.flash("errors", err);
                res.redirect('/register');
            })
    }


}

let checkEmailUser = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM user WHERE Email = ?`,
            email,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            }
        )
    })

}

exports = module.exports = {
    getSignUpPage,
    createNewUser
}