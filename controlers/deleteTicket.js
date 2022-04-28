const connection = require("../database/connection");


function deleteTicket(req) {

    return new Promise((resolve, reject) => {
        connection.query(
            `
            set autocommit = false;
            start transaction;
            insert into CanceledTicket (UserId, TicketId, Fare, DateOfBoarding, Email, numebr, nameOfPassenger , Boardind_From , Boardind_To , TrainId) select UserId , TicketId , Fare , DateOfBoarding, Email , numebr , nameOfPassenger , Boardind_From , Boardind_To , TrainId from Tickets 
            where TicketId = ${req.params.id};

            delete from Tickets where TicketId = ${req.params.id};
            UPDATE Train SET Seat_Available = Seat_Available+1 WHERE Train_No = ${req.params.tno};
            
            commit;
            set autocommit = true;
            ` ,
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









