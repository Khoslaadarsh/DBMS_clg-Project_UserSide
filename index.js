const express = require('express');
require('dotenv').config();
const app = express();
const CreateDB = require("./database/createTable");
const InsertDB = require("./database/insertData");
const SelectDB = require("./database/selectData");
const cookieParser = require("cookie-parser");
const connectFlash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const initPassport = require('./controlers/passportLocalControler');
const signUpControler = require('./controlers/signUpControler');
const loginControler = require('./controlers/loginControler');
const homePageControler = require('./controlers/homePageControler');
const auth = require('./validation/authValidation');

initPassport();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUnintialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(connectFlash());
app.set("view engine", "hbs");
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'))

// HOME
app.get('/', loginControler.checkLoggedIn, homePageControler.getHomePage);

// ADD station Page
app.get('/addStations', (req, res) => {

    SelectDB.GetAllStations()
        .then((stations) => {
            res.render('station', { stations });
        })
        .catch((err) => {
            res.send(err);
        })
})
app.post('/addStations', (req, res) => {
    InsertDB.AddNewStation(req.body.id, req.body.nameofstation, req.body.city)
        .then(() => {
            res.redirect('/addStations');
        })
        .catch(() => {
            res.send(err);
        })
})

// Login Routes
app.get('/login', loginControler.checkLoggedOut, loginControler.getLoginPage);
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    successFlash: true,
    failureFlash: true
}))

// Register Routes
app.get('/register', signUpControler.getSignUpPage);
app.post('/register', auth.validateRegister, signUpControler.createNewUser);

// Log Out Routes
app.post('/logout', loginControler.postLogOut);


// Server accepting responses
app.listen('3000', () => {
    console.log('Server started on port 3000');
})
















// -- create a table
// 
// CREATE TABLE Station (
//     Station_ID INTEGER PRIMARY KEY,
//     Name varchar(25) NOT NULL,
//     City varchar(25) NOT NULL
// );

// CREATE TABLE Routes (
//     Route_No INTEGER PRIMARY KEY,
//     Length numeric NOT NULL,
//     Expected_Time numeric
// );

// CREATE TABLE Pass_Through (
//     Station_ID INTEGER, 
//     Route_No INTEGER,
//     PRIMARY KEY (Station_ID, Route_No),
//     FOREIGN KEY (Station_ID) references Station(Station_ID),
//     FOREIGN KEY (Route_No) references Routes(Route_No)
// );

// CREATE TABLE Train (
//     Name varchar(25) NOT NULL,
//     Train_No INTEGER PRIMARY KEY,
//     Seat_Available INTEGER,
//     Current_Station varchar(25),
//     Train_Status varchar(25),
//     Station_ID INTEGER, 
//     Route_No INTEGER,
//     FOREIGN KEY(Station_ID) references Station(Station_ID),
//     FOREIGN KEY(Route_No) references Routes(Route_No)
// );

// CREATE TABLE Passenger (
//     Passenger_ID INTEGER PRIMARY KEY,
//     Address varchar(250) NOT NULL,
//     Age INTEGER NOT NULL,
//     Aadhar_No INTEGER NOT NULL,
//     First_name varchar(25) NOT NULL,
//     Last_name varchar(25)
// );

// CREATE TABLE Ride_On (
//     Train_No INTEGER,
//     Passenger_ID INTEGER,
//     PRIMARY KEY (Train_No, Passenger_ID),
//     FOREIGN KEY(Train_No) references Train(Train_No),
//     FOREIGN KEY(Passenger_ID) references Passenger(Passenger_ID)
// );

// CREATE TABLE _User (
//     First_name varchar(25) NOT NULL,
//     Last_name varchar(25),
//     User_ID INTEGER PRIMARY KEY,
//     Address varchar(250),
//     Age INTEGER NOT NULL,
//     Contact_No INTEGER NOT NULL
// );

// CREATE TABLE Ticket (
//     Ticket_ID INTEGER PRIMARY KEY,
//     Coach_No varchar(5) NOT NULL,
//     Departure_Time varchar(25) NOT NULL,
//     Arrival_Time varchar(25) NOT NULL,
//     Seat_No INTEGER NOT NULL
// );

// CREATE TABLE Book_Cancel (
//     User_ID INTEGER,
//     Ticket_ID INTEGER PRIMARY KEY,
//     FOREIGN KEY(User_ID) references _User(User_ID),
//     FOREIGN KEY(Ticket_ID) references Ticket(Ticket_ID)
// );

// CREATE TABLE have (
//     Passenger_ID INTEGER,
//     Ticket_ID INTEGER PRIMARY KEY,
//     FOREIGN KEY(Passenger_ID) references Passenger(Passenger_ID),
//     FOREIGN KEY(Ticket_ID) references Ticket(Ticket_ID)
// );











// -- -- insert some values
// -- INSERT INTO students VALUES (1, 'Ryan', 'M');
// -- INSERT INTO students VALUES (2, 'Joanna', 'F');
// -- -- fetch some values
// -- SELECT * FROM students WHERE gender = 'F';