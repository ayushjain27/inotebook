const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Ayushisabadb$oy';

// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
] ,async (req,res)=>{
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    //Check whether the user with this email exists already
    try{
    let user = await User.findOne({email: req.body.email});
    console.log(user);
    if(user){
        return res.status(400).json({error: "Sorry a user with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    // Create a new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    })

    const data = {
        user:{
            id:user.id
        }
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    

    // res.json(user);
    res.json({authtoken});
      
    // Catch errors
    }catch(error){
        console.log(error.mesage);
        res.status(500).send("Some error occured")
    }
})


module.exports = router


// // Create a User using: POST "/api/auth/createuser". No login required
// router.post('/createuser', [
//     body('name', 'Enter a valid name').isLength({min: 3}),
//     body('email', 'Enter a valid email').isEmail(),
//     body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
// ] ,async (req,res)=>{
//     // If there are errors, return Bad request and the errors
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({ errors: errors.array()});
//     }
//     //Check whether the user with this email exists already
//     let user = await User.findOne({email: req.body.email});
//     console.log(user);
//     if(user){
//         return res.status(400).json({error: "Sorry a user with this email already exists"})
//     }
//     user = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//     })
//     res.json(user);
    
//     // .then(user => res.json(user))
//     // .catch(err => {console.log(err)
//     // res.json({error: "Please enter a unique value for email", message: err.message})});
// })

// // Create a User using: POST "/api/auth". Doesn't require Auth
// router.post('/', [
//     body('name').isLength({min: 3}),
//     body('email').isEmail(),
//     body('password').isLength({min: 5}),
// ] , (req,res)=>{
//     console.log(req.body);
//     const user = User(req.body);
//     user.save();
//     res.send(req.body);
// })


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
