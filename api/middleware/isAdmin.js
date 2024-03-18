const User = require("../models/userModel")

module.exports = async (req, res, next) => {
    let user
    if (req.session.prenom !== undefined) {
        user = await User.findOne({
            where: {
                prenom: req.session.prenom
            }
        }, { raw: true })
    }

    if (!user || user.isAdmin === false) {
        res.redirect('/')
    } else {
        next()
    }
}