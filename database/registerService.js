const { checkSchema } = require('express-validator');
const connection = require('./connection');


let createNewUser = (user) => {
    console.log(user);
    return new Promise(async (resolve, reject) => {

        try {
            console.log("------------------");
            let check = await checkEmailUser(user.email);
            console.log(check);
            if (check) {
                reject(`This email ${user.email} already exist choose another email`);
            }
            else {
                let data = {
                    First_name: user.firstname,
                    Last_name: user.lastname,
                    Address: user.address,
                    dob: user.dob,
                    Email: user.email,
                    Password: user.password,
                    Contact_No: user.contact
                }
                console.log(data);
                connection.query(
                    `INSERT INTO user set ?`,
                    data,
                    (err, rows) => {
                        if (err)
                            reject(err);
                        else
                            resolve('Created a new user Successfully');
                    }
                )
            }

        }
        catch (err) {
            reject(err);
        }


    })
}

let checkEmailUser = (email) => {
    console.log(email);
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM user WHERE Email = ?`,
                email,
                (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else if (rows.length > 0) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            )
        }
        catch (err) {
            reject(err);
        }
    })

}

exports = module.exports = {
    createNewUser
}