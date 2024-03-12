const { Op } = require('sequelize')
const User = require('../models/userModel')

module.exports = {
    list: async (req,res) => {

    },
    getAccount: async (req,res) => {
        const account = await User.findByPk(req.params.id,{raw:true})
        res.render('my_account', { account })
    }
}