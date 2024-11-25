const { errors } = require('undici-types');
const pool =require('../config/db');

exports.getProfile=async(req,res)=>{

    try{
        const user=await pool.query(`SELECT id,email,phone,role FROM users WHERE id=$1`,
            [req.user.id]);
            res.json(user.rows[0]);
    }
        catch(error){
            res.status(500).json({error:'server error'});

        
    }
};

exports.updateProfile=async(req,res)=>{
    const{phone}=req.body;
    try{
    await pool.query(`UPDATE users SET phone =$1 WHERE id=$2`,[req.user.id]);
    res.json({message:'profileupdated uccessfully'});
    }
    catch(error){
        res.status(500).json({error:'server error'});
    }
}