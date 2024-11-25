const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const{ validationResult}=require('express-validator');
const{ createUser, findUserByEmail, FindUserByEmail}=require('../models/User');
const { error } = require('console');
require('dotenv').config();

exports.register=async(req, res)=>{
const errors=validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
    const {email,phone,password,confirmPassword}=req.body;

    if(password!==confirmPassword){
        return res.status(400).json({error:'password do not match'});

    }
    try{
        const existingUser=await findUserByEmail(email);
if(existingUser)  return res.status(400).json({error:'User already exists'});
        const hashedPassword=await bcrypt.hash(password,10);
        const user = await createUser(email,phone,password,hashedPassword);
        res.status(201).json({error:'User registered successfully'});
    }
    catch(error){
        res.status(500).json({error:'Server error'});
    }
};
 
exports.login=async(req,res)=>{
const {email,password}=req.body;

try{
    const user=await FindUserByEmail(email);
    if(!user) return res.sttaus(400).json({error:'Invalid credentials'});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({error:'Invalid credentials'});

    const token=jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.json({token});
}
catch(error){

res.status(500).json({error:'server error'});
}
};
