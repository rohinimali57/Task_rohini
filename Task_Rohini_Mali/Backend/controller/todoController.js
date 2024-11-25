const pool =require('../config/db');

exports.createTodo=async(req,res)=>{
    const{description}=req.body;
    try{
        const result=await pool.query(`INSERT INTO todos(user_id,description) VALUES($1,$2)
             RETURNING *`,
        [req.user.id,description]
        );

        res.json(result.rows[0]);
    }
    catch(error){
        res.status(500).json({error:'server error'});

    }

};