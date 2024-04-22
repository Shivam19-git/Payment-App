const express = require('express')
const router = express.Router()
const authMiddleware = require('../Middleware/middlewares')
const Account = require('../Database/db')
const mongoose = require('mongoose')

/*
    This file will use mongoose transactions method 
    such as sessions() transactions() etc to check
    the payment and balance status of the user
*/ 
router.get('/balance',authMiddleware, async (req,res)=>{
    const account = await  Account.findOne({
        userId : req.userId
    })
    res.json({
        balance : account.balance
    })
})

router.post('/transfer',authMiddleware, async (req,res)=>{

})


module.exports = router