// Inserting queries
// ADMIN WILL DO

const connection = require('./connection');

function AddNewStation(id, name, city) {

    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO Station (Station_ID, Name, City) VALUES (?, ?, ?)
            `,
            [id, name, city],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            }
        )

    })
}


exports = module.exports = {
    AddNewStation
}

