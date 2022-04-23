const connection = require("../database/connection");

function book(req, res) {

    // updates in tickets, train
    var datainticket = {
        Fare: req.body.fare,
        TrainId: req.body.tno,
        UserId: req.user.User_ID,
        DateOfBoarding: req.body.date,
        Email: req.body.email,
        numebr: req.body.number,
        nameOfPassenger: req.body.fname
    };
    datainticket.UserId = JSON.stringify(datainticket.UserId);
    return new Promise((resolve, reject) => {
        connection.query(
            `
            Start Transaction;
            insert into Tickets set ?; 
            UPDATE Train SET Seat_Available = Seat_Available-1 WHERE Train_No = ${req.body.tno};
            commit;
            `, datainticket,
            (err, rows, cols) => {
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

function bookTicket(req, res) {
    // console.log(req.user, req.body);

    book(req, res)
        .then(() => {
            console.log("Ticket booked");
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        })
    // res.redirect("/");
    return;
}






exports = module.exports = {
    bookTicket
}