const connection = require('./connection');


let findUserByEmail = (email) => {

    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM user WHERE Email = ?`,
                email,
                (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows[0]);
                    }

                }
            )
        }
        catch (err) {
            reject(err);
        }
    })


}


let comparePasswordUser = (user, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isMatch = (password === user.Password);
            // console.log(password, user.Password);
            if (isMatch) resolve(true);
            else resolve("The Password you have entered is incorrect");
        }
        catch (err) {
            reject(err);
        }
    })
}

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM user WHERE User_ID = ?`,
                id,
                (err, rows) => {
                    if (err) reject(err);
                    let user = rows[0];
                    resolve(user);
                }
            )
        }
        catch (err) {
            reject(err);
        }
    })
}

exports = module.exports = {
    findUserByEmail,
    comparePasswordUser,
    findUserById
}


