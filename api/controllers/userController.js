const { Op } = require('sequelize');
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const { Request, Response } = require('express');
const User = require('../models/userModel')

module.exports = {
    list: async (req,res) => {

    },
    get: (req, res) => { //
    
        // const navUser = true // sert à mettre le lien active 
        res.render('inscription')
    },
    getAccount: async (req,res) => {
        const account = await User.findByPk(req.params.id,{raw:true})
        res.render('my_account', { account })
    }
}