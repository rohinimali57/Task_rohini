const jwt = require('jsonwebtoken');
require('dotenv').config();

const authmiddleware=(req,res,next)=>{

const token=req.header('AUTHORIZATION');
if(!token) return res.status(401).send('Access Denied');

try{
const verified =jwt.verify(token,process.env.JWT_SECRET);
req.user=verified;
next();
}
catch(error){
res.status(400).send('Invalid Token');

}
};

const adminMiddleware=(req,res,next)=>{
    if(req.user.role !=='admin'){
return res.status(403).send('Access Forbidden');
    }
    next();
};
module.exports={authmiddleware,adminMiddleware};