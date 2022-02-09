
let getHomePage = (req, res) => {
    return res.render('home', {
        user: req.user
    });
}


exports = module.exports = {
    getHomePage
}
