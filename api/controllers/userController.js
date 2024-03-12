const { Op } = require('sequelize');
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const { Request, Response } = require('express');

module.exports = {
    get: (req, res) => { //
    
        // const navUser = true // sert à mettre le lien active 
        res.render('inscription')
    }
}