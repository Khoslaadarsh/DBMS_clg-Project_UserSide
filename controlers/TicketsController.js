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
        nameOfPassenger: req.body.fname,
        Boardind_From: req.body.from,
        Boardind_To: req.body.to
    };
    datainticket.UserId = JSON.stringify(datainticket.UserId);
    return new Promise((resolve, reject) => {
        connection.query(
            `
            set autocommit = off;
            Start Transaction;
            set @from = (select Station_ID from Station where Name = '${datainticket.Boardind_From}');
            set @to = (select Station_ID from Station where Name = '${datainticket.Boardind_To}');
            insert into Tickets (Fare, TrainId, UserId, DateOfBoarding, Email, numebr, nameOfPassenger, Boardind_From, Boardind_To)
            Values (${datainticket.Fare}, ${datainticket.TrainId}, ${datainticket.UserId}, "${datainticket.DateOfBoarding}", "${datainticket.Email}", ${datainticket.numebr}, "${datainticket.nameOfPassenger}", (select @from), (select @to))
            ;
            UPDATE Train SET Seat_Available = Seat_Available-1 WHERE Train_No = ${req.body.tno};
            commit;
            set autocommit = true;
            `,
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