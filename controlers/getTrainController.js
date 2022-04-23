

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tempUser',
    password: 'Khosla@2000',
    database: 'railrev2'
})

function GetTrains(req) {

    // console.log(req.query.train_from, req.query.train_to);
    from = req.query.train_from;
    to = req.query.train_to;
    return new Promise((resolve, reject) => {
        connection.query(

            `
            SELECT * FROM Train 
            WHERE Route_No IN (SELECT Route_No FROM Pass_Through 
                WHERE Route_No IN (SELECT Route_No FROM Pass_Through 
                    WHERE Station_ID = (SELECT Station_ID FROM Station WHERE Name = "${from}")
                        ) and Station_ID = (SELECT Station_ID FROM Station 
            WHERE Name = "${to}"))
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


function getTrainPage(req, res) {
    // console.log(req.user);
    GetTrains(req)
        .then((trains) => {
            // console.log(trains[0]);
            res.render('Trains', { trains, req });
        })
        .catch((err) => {
            res.send(err);
        })


}




exports = module.exports = {
    getTrainPage
}

