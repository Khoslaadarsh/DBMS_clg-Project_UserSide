const connection = require("../database/connection");

function getAllTrains() {

    return new Promise((resolve, reject) => {
        connection.query(

            `SELECT * FROM Station`,
            (err, rows, col) => {
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

let getHomePage = (req, res) => {

    return res.render('home', {
        user: req.user
    })


}

function getAllBookedTickets(req) {
    return new Promise((resolve, reject) => {
        // console.log("ticket");
        connection.query(

            `SELECT * FROM Tickets WHERE UserId = ${req.user.User_ID}`,
            (err, rows, col) => {
                if (err) {
                    reject(err);
                }
                else {
                    // console.log(rows);
                    resolve(rows);
                }
            }

        )
    })
}

let getHomePage2 = (req, res) => {
    getAllTrains()
        .then((Stations) => {
            getAllBookedTickets(req)
                .then((tickets) => {
                    // console.log(tickets);

                    tickets.forEach(element => {
                        element.DateOfBoarding = JSON.stringify(element.DateOfBoarding).substring(1, 11);
                    });

                    res.render('home_2', {
                        user: req.user,
                        tickets: tickets,
                        Stations
                    });
                })
                .catch((err) => {
                    res.send(err);
                })
        })
        .catch((err) => {
            res.send(err);
        })
}

exports = module.exports = {
    getHomePage,
    getHomePage2
}
