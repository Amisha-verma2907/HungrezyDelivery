const express = require('express');
const router = express.Router();
const  User = require('../models/User.js');
const {body,validationResult} = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "hellomynameisamisha";

//to create a user
router.post("/createUser",
[
   body('email').isEmail(),
   body('name').isLength({min:5}),
   body('password').isLength({min:5})
],
async (req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
   }

   const salt = await bcrypt.genSalt(10);
   let secPassword = await bcrypt.hash(req.body.password,salt);

    try{
       await User.create({
        // name:"Amisha",
        // password:"123",
        // email:"amisha123@gmail.com",
        // location:"Varanasi"
        name:req.body.name,
      //   password:req.body.password,
        password:secPassword,
        email:req.body.email,
        location:req.body.location
       })
      res.json({success:true});
    }catch(err){
       console.log(err);
       res.json({success:false})
    }
})


//to login a user
router.post("/loginUser",
[
   body('email').isEmail(),
   body('password').isLength({min:5})
],
async (req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
   }
   let email = req.body.email;
    try{
      let userData =  await User.findOne({email});
      if(!userData){
         return res.status(400).json({errors:"Try logging with correct credentials"})
      }
      
      let pwdCompare = await bcrypt.compare(req.body.password,userData.password);

      //before bcrypt
      // if(req.body.password !== userData.password){
      //    return res.status(400).json({errors:"Try logging with correct credentials"})
      // }
      
      //after bcrypt
      if(!pwdCompare){
         return res.status(400).json({errors:"Try logging with correct credentials"})
      }

      const data={
         user:{
            id:userData.id
         }
      }
      
      const authToken = jwt.sign(data,jwtSecret)
      return res.json({success:true, authToken})

    }catch(err){
       console.log(err);
       res.json({success:false})
    }
})

module.exports = router;