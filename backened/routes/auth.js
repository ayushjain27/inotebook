const express = require('express');
const User = require('../models/User');
const router = express.Router()

// Create a User using: POST "/api/auth". Doesn't require Auth
router.post('/', (req,res)=>{
    // obj = {
    //     a: 'thios',
    //     number: 34
    // }
    // res.json(obj)
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
})

// // Create a User using: POST "/api/auth". Doesn't require Auth
// router.get('/', (req,res)=>{
//     // obj = {
//     //     a: 'thios',
//     //     number: 34
//     // }
//     // res.json(obj)
//     console.log(req.body);
//     const user = User(req.body);
//     user.save();
//     res.send(req.body);
// })

module.exports = router