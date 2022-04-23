// creating tables
const connection = require('./connection');

// STATION
connection.query(
    `CREATE TABLE IF NOT EXISTS Station(
        Station_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
        Name varchar(25) NOT NULL,
        City varchar(25) NOT NULL
    );
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table STATION Created Successfully");
    }

)

// ROUTES
connection.query(
    `CREATE TABLE IF NOT EXISTS Routes (
        Route_No INTEGER PRIMARY KEY AUTO_INCREMENT,
        Length numeric NOT NULL,
        Expected_Time numeric
    );
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table ROUTES Created Successfully");
    }

)

// PASS THROUGH
connection.query(
    `CREATE TABLE IF NOT EXISTS Pass_Through (
        Station_ID INTEGER AUTO_INCREMENT, 
        Route_No INTEGER,
        PRIMARY KEY (Station_ID, Route_No),
        FOREIGN KEY (Station_ID) references Station(Station_ID),
        FOREIGN KEY (Route_No) references Routes(Route_No)
    );
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table PASS THROUGH Created Successfully");
    }

)

// TRAIN
// Added EndStationID as foreign key from station Table
connection.query(
    `CREATE TABLE IF NOT EXISTS Train (
        Name varchar(25) NOT NULL,
        Train_No INTEGER PRIMARY KEY AUTO_INCREMENT,
        Seat_Available INTEGER,
        Current_Station varchar(25),
        Train_Status varchar(25),
        Station_ID INTEGER, 
        Route_No INTEGER,
        FOREIGN KEY(Station_ID) references Station(Station_ID),
        FOREIGN KEY(Route_No) references Routes(Route_No)
    );
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table TRAIN Created Successfully");
    }

)

// PASSENGER
connection.query(
    `CREATE TABLE IF NOT EXISTS Passenger (
        Passenger_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
        Address varchar(250) NOT NULL,
        Age INTEGER NOT NULL,
        Aadhar_No INTEGER NOT NULL,
        First_name varchar(25) NOT NULL,
        Last_name varchar(25)
    );
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table PASSENGER Created Successfully");
    }
)


// RIDE ON
connection.query(
    `CREATE TABLE IF NOT EXISTS Ride_On (
        Train_No INTEGER,
        Passenger_ID INTEGER,
        PRIMARY KEY (Train_No, Passenger_ID),
        FOREIGN KEY(Train_No) references Train(Train_No),
        FOREIGN KEY(Passenger_ID) references Passenger(Passenger_ID)
    );
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table RIDE ON Created Successfully");
    }

)


// USER
connection.query(
    `CREATE TABLE IF NOT EXISTS user (
        User_ID INTEGER PRIMARY KEY AUTO_INCREMENT, 
        First_name varchar(25) NOT NULL,
        Last_name varchar(25),
        Address varchar(250),
        dob date NOT NULL,
        Email varchar(50) NOT NULL,
        Password varchar(100) NOT NULL, 
        Contact_No INTEGER NOT NULL
    );
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table USER Created Successfully");
    }

)

//ADMIN
connection.query(
    `CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTO_INCREMENT, 
        fullname varchar(25) NOT NULL,
        email varchar(50) NOT NULL,
        password varchar(100) NOT NULL
    );
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table Admin Created Successfully");
    }

)

// TICKET
connection.query(
    `CREATE TABLE IF NOT EXISTS Ticket (
        Ticket_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
        Coach_No varchar(5) NOT NULL,
        Departure_Time varchar(25) NOT NULL,
        Arrival_Time varchar(25) NOT NULL,
        Seat_No INTEGER NOT NULL
    );
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table TICKET Created Successfully");
    }

)


// BOOK - CANCEL
connection.query(
    `CREATE TABLE IF NOT EXISTS book_cancel (
        User_ID INTEGER,
        Ticket_ID INTEGER PRIMARY KEY,
        FOREIGN KEY(User_ID) references user(User_ID),
        FOREIGN KEY(Ticket_ID) references Ticket(Ticket_ID)
    );
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table BOOK-CANCEL Created Successfully");
    }
)


// HAVE
connection.query(
    `CREATE TABLE IF NOT EXISTS have (
        Passenger_ID INTEGER,
        Ticket_ID INTEGER PRIMARY KEY,
        FOREIGN KEY(Passenger_ID) references Passenger(Passenger_ID),
        FOREIGN KEY(Ticket_ID) references Ticket(Ticket_ID)
    );
    
    `,
    (err, results) => {
        if (err) console.error(err);
        else console.log("Table HAVE Created Successfully");
    }

)

// alter table Train add constraint FK_End_Station Foreign Key (Station_ID)
// references Station(Station_ID);


// alter table Train add EndStationID INTEGER;
// desc Train;

//mysql -u tempUser -p



