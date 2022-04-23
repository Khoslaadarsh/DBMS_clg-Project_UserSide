const connection = require("../database/connection");


function deleteTicket(req) {
    return new Promise((resolve, reject) => {
        connection.query(
            `
            start transaction;
            delete from Tickets where TicketId = ${req.params.id};
            UPDATE Train SET Seat_Available = Seat_Available+1 WHERE Train_No = ${req.params.tno};
            commit;
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
function getDeleteTicket(req, res) {
    deleteTicket(req)
        .then(() => {
            console.log('successfully deleted ticket');
            res.redirect('/home');
            return;
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/home');
        })
}


exports = module.exports = {
    getDeleteTicket
}









