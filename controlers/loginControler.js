
let getLoginPage = (req, res) => {
    res.render('login', {
        errors: req.flash("errors"),
    });
}

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    else
        next();
}

let checkLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        // res.send('yes logged in');
        res.redirect("/login");
    }
    else
        next();
}

let postLogOut = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login');
    })

}

exports = module.exports = {
    getLoginPage,
    checkLoggedIn,
    checkLoggedOut,
    postLogOut
}

