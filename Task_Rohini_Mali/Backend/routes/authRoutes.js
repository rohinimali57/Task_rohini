const express=require('express');
const {register,login}=require('../controllers/authController');
const router=express.Router();

router.post('/register',register);
router.post('/register',login);

module.exports=router;