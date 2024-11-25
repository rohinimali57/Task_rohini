const pool = require('../config/db');

const createUser =async(email,phone,password,role='user')=>{
    const result =await pool.query(

`INSERT INTO users(email,phone,password,role) VALUES($1,$2,$3,$4) RETURNING *`,
[email,phone,password,role]
    );
    return result.rows[0];
};

const FindUserByEmail= async (email)=>{
    const result = await pool.query(`SELECT * FROM users WHERE email =$1`,[email]);
    return result.rows[0];
};

const getALLUsers=async()=>{
    const result = await pool.query(`SELECT * FROM users`);
    return result.rows;
};
module.exports={createUser,FindUserByEmail,getALLUsers};