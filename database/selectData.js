const connection = require('./connection');


function GetAllStations() {

    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM Station`,
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

exports = module.exports = {
    GetAllStations
}