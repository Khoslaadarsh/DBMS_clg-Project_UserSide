const passport = require('passport');
const passportLocal = require('passport-local');
const loginService = require('../database/loginService');

let LocalStrategy = passportLocal.Strategy;

let initPassport = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        async (req, email, password, done) => {
            try {
                let user = await loginService.findUserByEmail(email)
                // console.log(user[0]);
                if (!user) {
                    return done(null, false, req.flash("errors", `This user Email ${email} does not exist`))
                }
                // else compare password
                else {
                    let match = await loginService.comparePasswordUser(user, password);
                    if (match === true) {
                        return done(null, user, null);
                    }
                    else {
                        return done(null, false, req.flash("errors", match));
                    }
                }
            }
            catch (err) {
                return done(null, false, err)
            }
        }
    ))
}


passport.serializeUser((user, done) => {
    return done(null, user.User_ID);
});

passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null);
    })
})


exports = module.exports = initPassport