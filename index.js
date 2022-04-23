const express = require('express');
require('dotenv').config();
const app = express();

const cookieParser = require("cookie-parser");
const connectFlash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const initPassport = require('./controlers/passportLocalControler');
const auth = require('./validation/authValidation');

// Controllers
const signUpControler = require('./controlers/signUpControler');
const loginControler = require('./controlers/loginControler');
const homePageControler = require('./controlers/homePageControler');
const getTrainController = require('./controlers/getTrainController');
const bookTicket = require('./controlers/TicketsController');
const deleteTicket = require('./controlers/deleteTicket')

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
app.get('/home', loginControler.checkLoggedInHome, homePageControler.getHomePage2);

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

// Train Route
app.get('/trains', getTrainController.getTrainPage);

// book tickets
app.post('/bookTicket', bookTicket.bookTicket)

// delete booked tickets
app.post('/deleteTicket/:id/:tno', deleteTicket.getDeleteTicket);

// Server accepting responses
app.listen('3300', () => {
    console.log('Server started on port 3300');
})
