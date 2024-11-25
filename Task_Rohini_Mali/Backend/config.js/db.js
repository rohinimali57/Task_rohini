const {pool}=require('pg');
require('dotenv').config();

const pool=new pool({
    user:process.env.DB_user,
    host:process.env.DB_Host,
    database:process.env.DB_Name,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT,

});

module.exports=pool;